
module.exports = (req, res) => {
    // 处理由 /upload 页面发送过来的post请求
    // req 中的 files 属性由 express-fileupload 中间件添加!? (疑问暂存)
    // 判断 files 属性是否存在 和 是否有文件传来 若无返回400
    if(req.files === null){
        return res.status(400).json({msg:'no file uploaded'});
    }
    // 否则 获取文件
    // file 由后文中 formData.append('file', file) 的第一个参数定义 可自定义为其他名称
    const file = req.files.file;
    console.log('upload', __dirname, file);
    // 移动文件到第一参数指定位置 若有错误 返回500
    file.mv(`/usr/local/upload/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err);
        }
        // 若无错误 返回一个 json
        // 我们计划上传文件后 根据文件在服务器上的路径 显示上传后的文件
        // 随后我们会在 react 组件中实现
        // 在客户端中的 public 文件夹下创建 uploads 文件夹 用于保存上传的文件
        res.json({fileName: file.name, filePath: `uploads/${file.name}`});
    });
}