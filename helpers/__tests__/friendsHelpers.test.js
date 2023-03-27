import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getFriends } from "./helpers";

jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  getDocs: jest.fn(),
}));

describe("getFriends function", () => {
  it("should return an empty array if userId is not provided", async () => {
    const friends = await getFriends();

    expect(friends).toEqual([]);
  });

  it("should return an array of friend userIds", async () => {
    const mockQueryResults1 = {
      docs: [
        { data: () => ({ userId2: "friend1" }) },
        { data: () => ({ userId2: "friend2" }) },
      ],
    };
    const mockQueryResults2 = {
      docs: [
        { data: () => ({ userId1: "friend3" }) },
        { data: () => ({ userId1: "friend4" }) },
      ],
    };
    const mockQueryResults3 = {
      docs: [
        { data: () => ({ userId2: "friend5" }) },
      ],
    };
    const mockQueryResults4 = {
      docs: [],
    };
    const expectedFriends = [
      "friend1",
      "friend2",
      "friend3",
      "friend4",
      "friend5",
    ];

    getFirestore.mockReturnValue({});
    collection.mockReturnValue({});
    query.mockReturnValueOnce(mockQueryResults1);
    query.mockReturnValueOnce(mockQueryResults2);
    query.mockReturnValueOnce(mockQueryResults3);
    query.mockReturnValueOnce(mockQueryResults4);

    const friends = await getFriends("testUserId");

    expect(friends).toEqual(expectedFriends);
    expect(getFirestore).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith({}, "relationships");
    expect(query).toHaveBeenCalledTimes(4);
    expect(where).toHaveBeenCalledTimes(4);
    expect(getDocs).toHaveBeenCalledTimes(4);
  });
});
