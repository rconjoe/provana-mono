interface IDatabase {

   // e.g. get all users
  getAll: (collection: string) => Array<FirebaseFirestore.DocumentData>

  // e.g. get this user
  getById: (collection: string, id: string) => FirebaseFirestore.DocumentData

  // e.g. get all users where key = value
  queryByField: (collection: string, key: string, value: any) => Array<FirebaseFirestore.DocumentData>

  // e.g. get this users entire notifications subcollection
  getSubcollection: (collection: string, id: string, subcollection: string) => Array<FirebaseFirestore.DocumentData>

  // e.g. some subcollection where key = value
  querySubcollection: (collection: string, id: string, subcollection: string, key: string, value: any) => Array<FirebaseFirestore.DocumentData>

}