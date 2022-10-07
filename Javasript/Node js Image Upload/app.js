const express = require('express');
const multer = require('multer');
const fs = require("fs");
const ejs = require('ejs');
const path = require('path');
const url =  require('url');

//Set Storage engine(Multer stuff)
const storage = multer.diskStorage({
  destination : './public',
  filename : function(req,file,cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initiliaze upload
const upload = multer({
  storage : storage,
  limits:{
    fileSize:2000000 // Limit : 2MB
  },
  fileFilter : function(req,file,cb){
    checkFileType(file,cb);
  }
}).single('myImage');

// Check File Type
function checkFileType(file,cb){
  // Allowed extensions
  const filetypes = /jpeg|jpg|png|gif/;
  //Check extensions
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check MIME Type
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  }else{
    cb('Error : Only Image Upload is allowed!');
  }
}

//Initiliaze the app
const app = express();

//Set up the View engine
app.set('view engine','ejs');

//Set Public Static Folder
app.use(express.static('./public'));
app.use('/images', express.static('images'));

app.get('/',(req,res)=>{
  res.render('index');
  const path = './public/images/myImage-1654168449443.png'
  try {
  fs.unlinkSync(path)
  //file removed
} catch(err) {
  console.error(err)
}

});

// app.get("/", (req, res) => {
//   console.log("hello")
//   let request = url.parse(req.url, true)
//   console.log(57, request,__dirname)
//   var action = request.pathname;
//    var filePath = path.join(__dirname,
//             action).split("%20").join(" ");
  
//   fs.existsSync(filePath, function (exists) {
 
//         if (!exists) {
//             res.writeHead(404, {
//                 "Content-Type": "text/plain" });
//             res.end("404 Not Found");
//             return;
//         }
 
//         // Extracting file extension
//         var ext = path.extname(action);
 
//         // Setting default Content-Type
//         var contentType = "text/plain";
 
//         // Checking if the extension of
//         // image is '.png'
//         if (ext === ".png") {
//             contentType = "image/png";
//         }
 
//         // Setting the headers
//         res.writeHead(200, {
//             "Content-Type": contentType });
 
//         // Reading the file
//         fs.readFile(filePath,
//             function (err, content) {
//                 // Serving the image
//                 res.end(content);
//             });
//     });
  
// })

app.post('/upload',(req,res)=>{
  upload(req,res,(err)=>{
    if(err){
      res.render('index',{
        msg:err
      })
    } else{
      if(req.file == undefined){
        res.render('index',{
          msg:'Error : No File Selected'
        })
      } else {
        res.render('index',{
          msg: 'File Successfully Uploaded!',
          file : `uploads/${req.file.filename}`
        });
      }
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
