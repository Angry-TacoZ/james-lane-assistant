const assert = require("node:assert/strict");
const test = require("node:test");

test("loads Firebase Admin Firestore and Storage modules", () => {
  const admin = require("firebase-admin");
  const firestore = require("firebase-admin/firestore");
  const storage = require("firebase-admin/storage");

  assert.equal(typeof admin.initializeApp, "function");
  assert.equal(typeof firestore.getFirestore, "function");
  assert.equal(typeof storage.getStorage, "function");
});
