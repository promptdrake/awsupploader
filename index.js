const express = require('express');
const { S3Client, PutObjectCommand, ListObjectsCommand, HeadObjectCommand } = require('@aws-sdk/client-s3');
const fileUpload = require('express-fileupload');
const ejs = require('ejs')
const path = require('path');
const axios = require('axios')
const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));

const s3Poolsatu = new S3Client({
  endpoint: 'https://0cde760d294bbe81ef57dd90a3269543.r2.cloudflarestorage.com/poolsatu',
  region: 'apac',
  credentials: {
    accessKeyId: '563d904a8cab73927e4d065be686c431',
    secretAccessKey: '8635b4be8473367947e2acb796823c9f0d8dcd2fd112df16a7ff705b9ec40784'
  }
});

const s3Pooldua = new S3Client({
  endpoint: 'https://0cde760d294bbe81ef57dd90a3269543.r2.cloudflarestorage.com/poolduas',
  region: 'apac',
  credentials: {
    accessKeyId: '563d904a8cab73927e4d065be686c431',
    secretAccessKey: '8635b4be8473367947e2acb796823c9f0d8dcd2fd112df16a7ff705b9ec40784'
  }
});
const s3Poolenamsatu = new S3Client({
  endpoint: 'https://0cde760d294bbe81ef57dd90a3269543.r2.cloudflarestorage.com/poolamrik1',
  region: 'enam',
  credentials: {
    accessKeyId: '563d904a8cab73927e4d065be686c431',
    secretAccessKey: '8635b4be8473367947e2acb796823c9f0d8dcd2fd112df16a7ff705b9ec40784'
  }
});
const s3Poolwestern1 = new S3Client({
  endpoint: 'https://a56f1dbed28e4ef6ad837478a3d3917b.r2.cloudflarestorage.com/poolwestern1',
  region: 'weur',
  credentials: {
    accessKeyId: 'd6445c32810ba064a1558d01282e782d',
    secretAccessKey: '10b0115a4a607e1d2319d988bea61c6bc09c7634d4692cef596a6254a9e4b134'
  }
});

const s3Pooleeur1 = new S3Client({
  endpoint: 'https://a56f1dbed28e4ef6ad837478a3d3917b.r2.cloudflarestorage.com/eeursatu',
  region: 'eeur',
  credentials: {
    accessKeyId: 'd6445c32810ba064a1558d01282e782d',
    secretAccessKey: '10b0115a4a607e1d2319d988bea61c6bc09c7634d4692cef596a6254a9e4b134'
  }
});

const s3Wnamsatu = new S3Client({
  endpoint: 'https://a56f1dbed28e4ef6ad837478a3d3917b.r2.cloudflarestorage.com/poolwnamsatu',
  region: 'wnam',
  credentials: {
    accessKeyId: 'd6445c32810ba064a1558d01282e782d',
    secretAccessKey: '10b0115a4a607e1d2319d988bea61c6bc09c7634d4692cef596a6254a9e4b134'
  }
});
const s3Pooljsatu = new S3Client({
  endpoint: 'https://b77a7dcddd82986a92824be5afeb159d.r2.cloudflarestorage.com/pooljsatu',
  region: 'wnam',
  credentials: {
    accessKeyId: '1325545621f2903dfe3d0c5e8f121e81',
    secretAccessKey: '080d586f1ea8956192f02fe86f5490660dd04a125442189f36a0f10c866dc944'
  }
});

const s3privatepanel = new S3Client({
  endpoint: 'https://b77a7dcddd82986a92824be5afeb159d.r2.cloudflarestorage.com/privatepanel',
  region: 'apac',
  credentials: {
    accessKeyId: '1325545621f2903dfe3d0c5e8f121e81',
    secretAccessKey: '080d586f1ea8956192f02fe86f5490660dd04a125442189f36a0f10c866dc944'
  }
});

const poolprem1 = new S3Client({
  endpoint: 'https://7c0ef63d0ac6611817af0986bc856da3.r2.cloudflarestorage.com/poolprem1',
  region: 'apac',
  credentials: {
    accessKeyId: 'a1e92126e5321826a487caad9d83b92b',
    secretAccessKey: 'e19145cdb8e89b412223b5c325d4dc844ce42f018e41c95698d01e3ec2b80ea5'
  }
});

const poolprem2 = new S3Client({
  endpoint: 'https://7c0ef63d0ac6611817af0986bc856da3.r2.cloudflarestorage.com/poolprem2',
  region: 'apac',
  credentials: {
    accessKeyId: 'a1e92126e5321826a487caad9d83b92b',
    secretAccessKey: 'e19145cdb8e89b412223b5c325d4dc844ce42f018e41c95698d01e3ec2b80ea5'
  }
});
const poolprem3 = new S3Client({
  endpoint: 'https://7c0ef63d0ac6611817af0986bc856da3.r2.cloudflarestorage.com/poolprem3',
  region: 'apac',
  credentials: {
    accessKeyId: 'a1e92126e5321826a487caad9d83b92b',
    secretAccessKey: 'e19145cdb8e89b412223b5c325d4dc844ce42f018e41c95698d01e3ec2b80ea5'
  }
});
const prem3 = new S3Client({
  endpoint: 'https://54f52dda40d078fe87ff689db1d5e5ff.r2.cloudflarestorage.com/premium3',
  region: 'apac',
  credentials: {
    accessKeyId: 'a01d96cf5697e6106093943095f7657c',
    secretAccessKey: 'c06b351420bfed5916ead55017453411e346406500b6c4225af3bde243a13f4b'
  }
});
const prem4 = new S3Client({
  endpoint: 'https://54f52dda40d078fe87ff689db1d5e5ff.r2.cloudflarestorage.com/premium4',
  region: 'apac',
  credentials: {
    accessKeyId: 'a01d96cf5697e6106093943095f7657c',
    secretAccessKey: 'c06b351420bfed5916ead55017453411e346406500b6c4225af3bde243a13f4b'
  }
});
const prem5 = new S3Client({
  endpoint: 'https://54f52dda40d078fe87ff689db1d5e5ff.r2.cloudflarestorage.com/premium5',
  region: 'apac',
  credentials: {
    accessKeyId: 'a01d96cf5697e6106093943095f7657c',
    secretAccessKey: 'c06b351420bfed5916ead55017453411e346406500b6c4225af3bde243a13f4b'
  }
});

app.use(fileUpload());



app.post('/upload/dd883806-edd6-43c4-8ad7-b1521d91e68a/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Sorry But this server only accepting image, Please Use other server to upload another file' });
    }

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'poolsatu',
      Key: `temp-${Date.now().toString()}.apac${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Poolsatu.send(putObjectCommand);

    const fileUrl = `https://pub-73c7b84f78124062aec73ec8773d043a.r2.dev/poolsatu/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/26dc5ac0-fb75-4a07-a066-68288680f0bb/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Sorry But this server only accepting image, Please Use other server to upload another file' });
    }

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'poolduas',
      Key: `temp-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Pooldua.send(putObjectCommand);

    const fileUrl = `https://pub-318a5b7967614a2d894129bc59f92c8b.r2.dev/poolduas/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/52bf3779-a5b3-40ff-b85a-1319c2b15f9e/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'poolamrik1',
      Key: `temp-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Poolenamsatu.send(putObjectCommand);

    const fileUrl = `https://pub-2bd6d2ee6db14f36ada268763e8850a4.r2.dev/poolamrik1/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/08942a23-9c49-459c-a77f-b1b1557bf0aa/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Sorry But this server only accepting image, Please Use other server to upload another file' });
    }

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'poolwestern1',
      Key: `temp-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Poolwestern1.send(putObjectCommand);

    const fileUrl = `https://pub-a368c17f5c404d088a8cf253d09c0cbe.r2.dev/poolwestern1/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.get('/rule', (req,res) => {
res.sendFile('rule.txt', { root: __dirname })
});
app.post('/upload/1510aa1f-9958-4882-a0ff-b57cbcd2d64b/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'eeursatu',
      Key: `temp-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Pooleeur1.send(putObjectCommand);

    const fileUrl = `https://pub-5cdfd4d7774e49aa99f6878c6ebe8db9.r2.dev/eeursatu/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/a82e8ca7-6725-47c2-acac-09181e3c2074/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!ishtml(file)) {
      return res.status(400).json({ error: 'Your File detected as Not Web Host, Please Use Another server' });
    }

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'pooljsatu',
      Key: `jsfile-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Pooljsatu.send(putObjectCommand);

    const fileUrl = `https://pub-479fc6dbe0544cb19cb72879fc05c872.r2.dev/pooljsatu/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/2ef28319-8e80-4eec-87b7-7b03d788008e/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Sorry But this server only accepting image, Please Use other server to upload another file' });
    }

    const fileExtension = path.extname(file.name);

    const uploadParams = {
      Bucket: 'poolwnamsatu',
      Key: `temp-${Date.now().toString()}${fileExtension}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3Wnamsatu.send(putObjectCommand);

    const fileUrl = `https://pub-f103919a71a647deb68deeec70f967c3.r2.dev/poolwnamsatu/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/39c8f341-f903-492b-8841-18e5a35505d8/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'privatepanel',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await s3privatepanel.send(putObjectCommand);

    const fileUrl = `https://pub-efb1db90550941b7a797838b273e0e34.r2.dev/privatepanel/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/b6146c8f-5421-4ca8-b77f-5e916fc9c4d8/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'poolprem1',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await poolprem1.send(putObjectCommand);

    const fileUrl = `https://pub-eef62aa888bf4e2ba5868f47ab4e2aee.r2.dev/poolprem1/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/3f1652a8-8100-44a5-abaf-b3601fe9e1c4/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'poolprem2',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await poolprem2.send(putObjectCommand);

    const fileUrl = `https://pub-eb297788864f4d23b5a0d36d67b96074.r2.dev/poolprem2/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/77868324-f071-4d15-af58-6619988865cf/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'poolprem3',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await poolprem3.send(putObjectCommand);

    const fileUrl = `https://pub-c932e375ce524b409e3ea3b04ff5906a.r2.dev/poolprem3/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/1a8763aa-0cde-4881-9145-127656332571/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'premium3',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await prem3.send(putObjectCommand);

    const fileUrl = `https://pub-c690c73d91044c499332520acaa8b267.r2.dev/premium3/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/b48979ee-c069-4494-bc04-513402ca7a4a/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'premium4',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await prem4.send(putObjectCommand);

    const fileUrl = `https://pub-9d13f6a7b9bc4d39aa3ebca02cbe088a.r2.dev/premium4/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/e4d1d5f1-620c-4d64-baaf-bcbd00510d99/:action', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;

    const fileExtension = path.extname(file.name);
    const filename = path.basename(file.name)
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const uploadParams = {
      Bucket: 'premium5',
      Key: `${day}-${month}-${year}/${filename}`,
      Body: file.data,
      ACL: 'public-read',
      ContentType: file.mimetype
    };

    const putObjectCommand = new PutObjectCommand(uploadParams);
    await prem5.send(putObjectCommand);

    const fileUrl = `https://pub-187d80d06af848a3919cc61817700f80.r2.dev/premium5/${uploadParams.Key}`;
    if(req.params.action === "json") {
      res.status(200).json({ url: fileUrl, status: "OK" });
    }
    else {
      res.redirect(fileUrl);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

function ishtml(file) {
  const allowedMimetypes = ['text/html', 'text/css', 'application/javascript', 'text/plain', 'text/html', 'text/plain']; // Add more allowed mimetypes if needed
  return allowedMimetypes.includes(file.mimetype);
}

function isImage(file) {
  return file.mimetype.startsWith('image/');
}

app.get('/', (req, res) => {
  if(req.query.id) {
  res.render('home', { field: req.query.id });
  }
  else {
    const randomOption = getRandomOption();
    res.redirect('/./?id='+ randomOption)
  }
});
function getRandomOption() {
  const options = [
    'dd883806-edd6-43c4-8ad7-b1521d91e68a',
    '26dc5ac0-fb75-4a07-a066-68288680f0bb', 
    'a82e8ca7-6725-47c2-acac-09181e3c2074', 
    '52bf3779-a5b3-40ff-b85a-1319c2b15f9e', 
    '08942a23-9c49-459c-a77f-b1b1557bf0aa', 
    '1510aa1f-9958-4882-a0ff-b57cbcd2d64b'
  ];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

app.listen(80, () => {
  console.log(`Server is running on port 80`);
});
