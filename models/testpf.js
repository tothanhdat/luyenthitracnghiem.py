const ObjectID = require('mongoose').Types.ObjectId;
const TESTPF_COLL = require('../database/testpf-coll');

module.exports = class Test extends TESTPF_COLL {

    static getListTestpfWithDefault() {
        return new Promise(async resolve => {
            try {
                let listTestpf = await TESTPF_COLL.find().limit(100000);

                if (!listTestpf) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listTestpf });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }

    static getListTestpfWithLean() {
        return new Promise(async resolve => {
            try {
                let listTestpfWithLean = await TESTPF_COLL.find().limit(100000).lean();

                if (!listTestpfWithLean) return resolve({ error: true, message: 'cannot_get_list_data' });

                return resolve({ error: false, data: listTestpfWithLean });

            } catch (error) {

                return resolve({ error: true, message: error.message });
            }
        })
    }
   
}