const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const configConven = require('../config/dbConvenConn')[env];
const configTwitch = require('../config/dbTwitchConn')[env];
const db = {};
// 편의점
const sequelize_conven = new Sequelize(configConven.database, configConven.username, configConven.password, configConven);
// 상품정보
db.Product = require('./product')(sequelize_conven, Sequelize);
// 사용자
db.User = require('./user')(sequelize_conven, Sequelize);

// 트위치
const sequelize_twitch = new Sequelize(configTwitch.database, configTwitch.username, configTwitch.password, configTwitch);
// 스트리머정보
db.Streamer = require('./streamer')(sequelize_twitch, Sequelize);

// 추후 테이블간 연관관계가 생길경우 주석 해제
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize_conven = sequelize_conven;
db.sequelize_twitch = sequelize_twitch;
db.Sequelize = Sequelize;

// !절대로 false 로 해야함.데이터 수집쪽에서도 테이블을 사용하므로 변경하면 안된다.!!!!!!
// 버그가 존재하는지 테이블 drop 후 다시 생성됨.... 수집및 카테고리 분류기용 상품데이터 모두 사라짐. 테이블 백업!!!
db.sequelize_conven.sync({force: false});
db.sequelize_twitch.sync({force: false});

module.exports = db;