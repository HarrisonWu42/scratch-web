// 把文件按照二进制进行读取
export function  readFile(file) {
    return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
            resolve(ev.target.result)
        };
    });
}

//字段对应表
export let character = {
    name: {
        text: "姓名",
        type: "string"
    },
    email: {
        text: "邮箱",
        type: "string"
    }
}