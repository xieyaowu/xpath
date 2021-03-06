/**
 * @file karma配置
 * @author fe.xiaowu@gmail.com
 */

const base = require('./karma.conf.base.js');

const customLaunchers = {
    // Safari
    sl_ios_safari: {
        base: 'SauceLabs',
        browserName: 'Safari'
    },

    // 安卓浏览器
    sl_android_4_4: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '4.4'
    },
    sl_android_5: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '5'
    },
    sl_android_6: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '6'
    },

    // chrome
    sl_ios_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome'
    },

    // sl_ie_8: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 7',
    //     version: '8'
    // },
    sl_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },
    sl_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
    },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },

    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 7'
    }
};

// 不支持本地运行
if (!process.env.TRAVIS) {
    console.error('不支持本地运行, 请使用 npm run test!');
    process.exit(1);
}

// 变量检查
if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
    console.error('---------------');
    console.error('Make sure the SAUCE_USERNAME and SAUCE_ACCESS_KEY environment variables are set.');
    console.error('---------------');
    process.exit(1);
}

module.exports = function (config) {
    const options = Object.assign(base(config), {
        reporters: ['mocha', 'saucelabs'],
        sauceLabs: {
            'testName': 'xpath test case',
            'recordVideo': false,
            'recordScreenshots': false,
            'startConnect': false,
            'connectOptions': {
                'no-ssl-bump-domains': 'all'
            },
            'public': 'public',
            'build': process.env.CIRCLE_BUILD_NUM || process.env.SAUCE_BUILD_ID || 'build-' + Date.now(),
            'tunnelIdentifier': process.env.TRAVIS_JOB_NUMBER
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        captureTimeout: (1000 * 60) * 5,
        browserNoActivityTimeout: (1000 * 60) * 5
    });

    config.set(options);
};
