const orderHeaders = {
    number: {
        id: 'number',
        text: '№'
    },
    goods: {
        id: 'goods',
        text: 'Товары (работы, услуги)'
    },
    count: {
        id: 'count',
        text: 'Кол-во'
    },
    unit: {
        id: 'unit',
        text: 'Ед.'
    },
    row: {
        id: 'row',
        text: '__rowNum__'
    }
};

const orderingHeaders = {
    goods: {
        id: 'goods',
        text: 'Продукция'
    },
    paintWeigth: {
        id: 'paintWeigth',
        text: 'вес нетто'
    },
    collection: {
        id: 'collection',
        text: 'Вид тары'
    },
    unit: {
        id: 'unit',
        text: 'Ед.'
    }
};

const fetchAll = async () =>
    await new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(orderHeaders);
        }, 1000);
    });

const getOrderingHeaders = async () =>
    await new Promise((resolve) => {
        window.setTimeout(function () {
            resolve(orderingHeaders);
        }, 1000);
    });

export default {
    fetchAll,
    getOrderingHeaders
};
