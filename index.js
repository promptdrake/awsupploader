const express = require('express');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
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

app.use(fileUpload());

app.post('/upload/poolsatu', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/pooldua', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/enamsatu', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
    }

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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/weursatu', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});
app.post('/upload/eeursatu', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
    }

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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

app.post('/upload/wnamsatu', async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file;
    if (!isImage(file)) {
      return res.status(400).json({ error: 'Nice Try kid for inspecting element and change the accept form only image to everything, Please follow the rules' });
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
    res.redirect(fileUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while uploading the file' });
  }
});

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
  const options = ['poolsatu', 'pooldua', 'enamsatu', 'weursatu', 'eeursatu', 'wnamsatu'];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

app.listen(80, () => {
  console.log(`Server is running on port 80`);
});
