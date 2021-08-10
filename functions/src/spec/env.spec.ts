
const conf = {
  apiKey: "AIzaSyBBBrVHVYBo4Hrc3rtsdOaCjN33R-9ypjY",
  authDomain: "db-abstract.firebaseapp.com",
  projectId: "db-abstract",
  storageBucket: "db-abstract.appspot.com",
  messagingSenderId: "902848736944",
  appId: "1:902848736944:web:49998bcb0ba26d4001d575",
  measurementId: "G-MQKBZ5H9HT"
}

const stripeConf = { stripe: { secret: 'sk_test_51HJUgfGoIl5NLNcQ8xzPwo3tXqwoaGym8ZXwPBxbVWuOEEdCQxst4ORTV9x8GU4k4TK9uyFFiB9zLHMvDMLSV9UW00N8C4ejVB' }}

import functionsTest = require('firebase-functions-test')

const testEnv = functionsTest(conf, 'test-creds.json')

testEnv.mockConfig(stripeConf)

export { testEnv }
