let cacheData = null;
let cacheTime = 0;

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

const CacheEngine = {

    getCache(){
        return cacheData;
    },

    isValid(){
        return cacheData && (Date.now() - cacheTime < CACHE_DURATION);
    },

    setCache(data){
        cacheData = data;
        cacheTime = Date.now();
    }

};

module.exports = CacheEngine;
