_This isn't as much of a readme as it is a bulletin board for important things to know about the functions repo._



- **test-creds.json** is a copy of the service account key generated from the firebase project settings dashboard. It has to be there because the admin SDK calls admin.initializeApp() in order to use the sdk for DB writes, user operations, and other stuff during tests, and that call requires credentials.