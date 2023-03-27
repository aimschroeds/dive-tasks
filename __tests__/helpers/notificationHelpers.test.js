import { sendFriendshipRequestNotification, sendFriendshipAcceptanceNotification } from "../../helpers/notificationHelpers";
import { db } from "../../firebase";

describe("sendFriendshipRequestNotification", () => {
  it("should add a friendship request notification to the database", async () => {
    const senderId = "sender123";
    const recipientId = "recipient456";

    // Call the helper function
    await sendFriendshipRequestNotification(senderId, recipientId);

    // Check if the notification was added to the database
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);
    const notifications = querySnapshot.docs.map((doc) => doc.data());

    expect(notifications).toHaveLength(1);
    expect(notifications[0].senderId).toEqual(senderId);
    expect(notifications[0].recipientId).toEqual(recipientId);
    expect(notifications[0].type).toEqual("friendship_request");
    expect(notifications[0].message).toEqual("sent you a friend request.");
    expect(notifications[0].read).toBeFalsy();
    expect(notifications[0].timestamp).toBeInstanceOf(Date);
  });
});

describe("sendFriendshipAcceptanceNotification", () => {
  it("should add a friendship acceptance notification to the database", async () => {
    const senderId = "sender123";
    const recipientId = "recipient456";

    // Call the helper function
    await sendFriendshipAcceptanceNotification(senderId, recipientId);

    // Check if the notification was added to the database
    const notificationsRef = collection(db, "notifications");
    const querySnapshot = await getDocs(notificationsRef);
    const notifications = querySnapshot.docs.map((doc) => doc.data());

    expect(notifications).toHaveLength(1);
    expect(notifications[0].senderId).toEqual(senderId);
    expect(notifications[0].recipientId).toEqual(recipientId);
    expect(notifications[0].type).toEqual("friendship_acceptance");
    expect(notifications[0].message).toEqual("accepted your friend request.");
    expect(notifications[0].read).toBeFalsy();
    expect(notifications[0].timestamp).toBeInstanceOf(Date);
  });
});
