import { addDoc, collection, collectionGroup, getDocs, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, firestore } from "./firebase";

const CONTENT_TYPES = {
  JOBS: "Jobs",
  WORKSHOPS: "Workshops",
  QUIZZES: "Quizzes",
  HACKATHONS: "Hackathons",
};

export { CONTENT_TYPES };

export const createRecruiterContent = async (contentType, payload) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be logged in.");
  }

  const contentRef = collection(firestore, "Recruiters", user.uid, contentType);
  const nowIso = new Date().toISOString();
  await addDoc(contentRef, {
    ...payload,
    recruiterId: user.uid,
    recruiterEmail: user.email || "",
    status: payload.status || "published",
    postedAt: nowIso,
    expiresAt: payload.applyBefore || null,
    createdAt: serverTimestamp(),
  });
};

export const fetchRecruiterContent = async (contentType, options = {}) => {
  const { onlyPublished = true, includeExpired = false } = options;
  const contentQuery = query(collectionGroup(firestore, contentType), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(contentQuery);
  const now = new Date();

  return snapshot.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .filter((item) => {
      if (onlyPublished && item.status && item.status !== "published") {
        return false;
      }
      if (!includeExpired && item.expiresAt) {
        const expiryDate = new Date(item.expiresAt);
        if (!Number.isNaN(expiryDate.getTime()) && expiryDate < now) {
          return false;
        }
      }
      return true;
    });
};

export const fetchMyRecruiterContent = async (contentType) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be logged in.");
  }

  const ownContentQuery = query(
    collection(firestore, "Recruiters", user.uid, contentType),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(ownContentQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const createJobApplication = async (applicationPayload) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be logged in.");
  }

  const userApplicationsRef = collection(firestore, "Users", user.uid, "AppliedJobs");
  await addDoc(userApplicationsRef, {
    ...applicationPayload,
    applicantId: user.uid,
    applicantEmail: user.email || applicationPayload.email || "",
    createdAt: serverTimestamp(),
    appliedAt: new Date().toISOString(),
  });
};

export const fetchRecruiterApplications = async () => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("You must be logged in.");
  }

  const applicationsQuery = query(
    collectionGroup(firestore, "AppliedJobs"),
    where("recruiterId", "==", user.uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(applicationsQuery);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
