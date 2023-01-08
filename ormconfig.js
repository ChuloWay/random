

ORMconfig = {
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity.js'],
    synchronize: false,
};

module.exports = ORMconfig;

