const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const cors = require('cors');
app.use(express.static('public'));
const convenienceRouter = require('./routes/convenience');
const twitchRouter = require('./routes/twitch');
const path = require('path')
//app.set('view engine', 'html'); // express 공식문서상에는 html 인경우 랜더링등이 필요없다고 나옴 -- 구글검색등에 나오는 html 렌더링 관련된부분  stackflow  에까지 자세히 논의중인데 모두 무시하도록!!!!
// 배포후 false


// app.use(cors({
//   origin: 'http://localhost:8080',
//   credentials: true,
// }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/dist')));
const startT = Date.now();
app.get('/check', (_, res) => res.json({time: Date.now() - startT}));
//app.use('/', (req, res) => res.render('index.html'));
app.use('/api/conven' , convenienceRouter);
app.use('/api/twitch' , twitchRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist' ,'index.html'))
});
// 없는 요청인경우
app.use((req, res, next) => {
  res.status = 404;
  next(Error('not found'));
})
// 요청부분 에러발생한경우
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(res.statusCode || 500);
  res.json({ error: err.message || 'internal server error' });
})

app.listen(port, () => console.log(`app listening at ${port}`));