import configstore from 'configstore';

export const configOnFire = new configstore(PKG_NAME, {}, { globalConfigPath: true });
