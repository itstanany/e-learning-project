/* eslint-disable camelcase */
const type = process.env.FBA_TYPE || 'service_account';
const project_id = process.env.FBA_PROJECT_ID || 'e-learning-76331';
const private_key_id = process.env.FBA_PRIVATE_KEY_ID || 'f641ff6d70111eb6aaba660126233ff13caef8c6';
const private_key = process.env.FBA_PRIVATE_KEY?.replace(/\\n/g, '\n') || '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCceRFLyy4C56w5\nvvIupK6NjYunULawNWwGUaN4SH2KZaIhp7XiSivEHMDDAEJiIK7MqdzJBj39h30n\nFwlCWXW3BrjYvGHVDlZTYp7E7QhIrn/d1Kd0QHtBGENDh7peuidS5qVqwsran7Hy\n5S9nEFlIfWniL3ukLcZn6YknR096DvqQ5alim+otWkeanrQh+yJdWMk6gmR/tcX2\nKhNb/W/mIf46+v2vN04uwzJzgEZcv+bmEime89/8lM2fNsHCevKKvpNgOFiSAhDv\nitWpHyvbOn2rQ7zHvbsSOuDiSJB43mH+3IIYjg4cwqmW9hxkIX4uLn0m6gRWiKhr\noBso4kV3AgMBAAECggEARZg/jiOPknEyk/iOxRowHPuQ2tk2eEc6hdD30T8Ev3KW\n2zs51a1BrBdR0SmjXPvGY3dFoQ+qsMH7c1B2qNEbX02ZF6UqKlYXJT1e+p2mqpUa\ngDLeTAGGEJzXBgkvZoSLiv7VIhgDm5udzTgMjl2iKHDHkHeoGYzWi08+1n6MJfAj\nhpvEdXAXPtQ7jS1OhZqlbydtT1emujY3VuQLiZtoL0Df6vUolLCeRRkl3RA2RfqC\nxWy2t5gySK4O8zsZwFZ/z7AqPczp+9Jtc+RnO4VkNKN/D0FFPRE1alfAJwjmJudN\notHg1peumXn93Q2BsIeEWwF8JFXCinleJsPXsH+58QKBgQDL3N5JiQxjWHshqeUf\nI2HtlyCPylClYWbzed5FHXeALqWbnQi6VmBKHl/h/WNApn2ckXIBnVwF1e/wUuZs\najOV8WIWyagvCQjoNrJrCfMAdJhOmUlNf0dQZC0991dTC9p5EEFowS/WfshmJTMF\ngIIAnSpLA49zf5Tu4KCjn6sbKQKBgQDEfYfy9ov2usZX2zNKwdTEurl/hjrYNgni\nQgVm0zO1QT8/vkhe0eVHaRHQOg7n64/FfNPUvurfs9qthxpowk6mXH+/tnosQEt3\nRQPGP/cU+qEh84/LMEWQfgnADRIO8Sb2+WCenGuDIJgOEq4MhEmd2KFHFfqcFENi\nj27glH0PnwKBgG8A69S0mBc8JYe1/7lNxdPd92/0JKd4ettWX23Y1qnoPGqYPhlg\nUPvqwCDInROl1D29gItaiLHwxL5iFW+xADfEALoRwc8ip0PyDIJ2H2f/FLOviZd2\nF3mxomTcWiMxEBvdexA0KP0teacM2FRFngQBj/bakHC+ZnUPwMh3d27JAoGBAJZp\nYcBjaxEcOOjYK5N2fWF7brRoFHOeKkLBN1FXK6X8pGYvS0cKdfEMRU6YowB2GkCb\nJa0d2L4V97gOS/EVjQ9cj446KZvmO965PgJsxL+Se/Z5dAGemiHZ2aziVIiLocA9\ndfD03HgsYzmiowmB2riyNAMumAESoeK42a+g+3sRAoGAXbcv5f2Hh7B+wcrMlKKO\n7+vebmwgEogv656f7Sxegu0K8bX2NpOJVN+xM8rezhG3SV9uIcE1miSJ9Q2Imuyr\n7Aey8E/lrRRzMeikUbQrLSytLaRzoLEewqEutivbL+OLnOcH7o0cxfusC1vDrvov\nduzZJd6chzYBm8k2lMNwKeY=\n-----END PRIVATE KEY-----\n';
const client_email = process.env.FBA_CLIENT_EMAIL || 'firebase-adminsdk-xqv7t@e-learning-76331.iam.gserviceaccount.com';
const client_id = process.env.FBA_CLIENT_ID || '115143213502093949190';
const auth_uri = process.env.FBA_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth';
const token_uri = process.env.FBA_TOKEN_URI || 'https://oauth2.googleapis.com/token';
const auth_provider_x509_cert_url = process.env.FBA_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs';
const client_x509_cert_url = process.env.FBA_CLIENT_X509_CERT_URL || 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xqv7t%40e-learning-76331.iam.gserviceaccount.com';
const storageBucket = process?.env?.FBA_STORAGE_BUCKET;

export {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  storageBucket,
};
