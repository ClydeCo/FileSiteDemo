

export const getIcon = (type) => {
    switch (type) {
        case "WORDX": return "fa fa-file-word-o";
        case "ACROBAT": return "fa fa-file-pdf-o";
        case "NUANCE": return "fa fa-file-pdf-o";
        case "MIME": return "fa fa-envelope-o";
        case "LFM90": return "fa fa-dot-circle-o";
        case "XML": return "fa fa-file-code-o";
        default: return "fa fa-file";
    }
}

export const bytesToSize = (bytes) => {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}