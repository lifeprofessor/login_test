const {createLogger, transports, format} = require("winston");
const accessLogStream = require("./log");
const {combine, timestamp, label, printf, simple, colorize} = format;

const printFormat = printf(({timestamp, label, level, message})=>{
    return `${level} [${label}] ${timestamp} ${message}`
});

const printLogFormat = {
    file: combine(
    label({
        label: "테스트 로그"
    }),
    //colorize(),
    timestamp({
        format: "YYYY-MM-DD HH:mm:dd",
    }),
    printFormat,
    ),
    console: combine(
       colorize(),
       simple(), 
    )
}

const opts = {
    file:  new transports.File({
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat.console,
    }),
}

const logger = createLogger({
    transports: [opts.file],
});

if(process.env.NODE_ENV !== "production"){
    logger.add(opts.console);
}

module.exports = logger;