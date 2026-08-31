import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  type DocumentData,
} from "firebase/firestore";
import { db } from "./firebase";

type Inquiry = {
  id: string;
  source: "SEO Requirement" | "Contact Message";
  data: DocumentData;
};

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (letter) => letter.toUpperCase());
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    try {
      return (
        value as {
          toDate: () => Date;
        }
      ).toDate().toLocaleString();
    } catch {
      return "—";
    }
  }

  if (Array.isArray(value)) {
    return value.map((item) => formatValue(item)).join(", ");
  }

  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function getDateValue(data: DocumentData): number {
  const candidates = [
    data.createdAt,
    data.timestamp,
    data.submittedAt,
    data.date,
  ];

  for (const value of candidates) {
    if (
      value &&
      typeof value === "object" &&
      "toDate" in value &&
      typeof (value as { toDate?: unknown }).toDate === "function"
    ) {
      try {
        return (
          value as {
            toDate: () => Date;
          }
        ).toDate().getTime();
      } catch {
        continue;
      }
    }

    if (value instanceof Date) {
      return value.getTime();
    }

    if (typeof value === "string" || typeof value === "number") {
      const parsed = new Date(value).getTime();

      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return 0;
}

function getSubmissionDate(data: DocumentData): string {
  const candidates = [
    data.createdAt,
    data.timestamp,
    data.submittedAt,
    data.date,
  ];

  for (const value of candidates) {
    if (
      value &&
      typeof value === "object" &&
      "toDate" in value &&
      typeof (value as { toDate?: unknown }).toDate === "function"
    ) {
      try {
        return (
          value as {
            toDate: () => Date;
          }
        ).toDate().toLocaleString();
      } catch {
        continue;
      }
    }

    if (value instanceof Date) {
      return value.toLocaleString();
    }

    if (typeof value === "string" || typeof value === "number") {
      const parsed = new Date(value);

      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleString();
      }
    }
  }

  return "Date unavailable";
}

function InquiryCard({ inquiry }: { inquiry: Inquiry }) {
  const [isOpen, setIsOpen] = useState(false);

  const title =
    inquiry.data.name ||
    inquiry.data.fullName ||
    inquiry.data.company ||
    inquiry.data.email ||
    "New inquiry";

  const preview =
    inquiry.data.message ||
    inquiry.data.requirements ||
    inquiry.data.projectDetails ||
    inquiry.data.service ||
    "Open to view submitted details.";

  const fields = Object.entries(inquiry.data).filter(
    ([key]) =>
      !["createdAt", "timestamp", "submittedAt", "date"].includes(key)
  );

  return (
    <article className="admin-inquiry-card">
      <button
        type="button"
        className="admin-inquiry-toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span>
          <small>{inquiry.source}</small>
          <strong>{formatValue(title)}</strong>
          <em>{formatValue(preview)}</em>
        </span>

        <span className="admin-inquiry-date">
          {getSubmissionDate(inquiry.data)}
        </span>
      </button>

      {isOpen && (
        <div className="admin-inquiry-details">
          {fields.length > 0 ? (
            fields.map(([key, value]) => (
              <div className="admin-detail-row" key={key}>
                <b>{formatLabel(key)}</b>
                <p>{formatValue(value)}</p>
              </div>
            ))
          ) : (
            <p>No submission details found.</p>
          )}
        </div>
      )}
    </article>
  );
}

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadInquiries() {
    if (!db) {
      setError("Firebase is not configured.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const [requirementsSnapshot, messagesSnapshot] = await Promise.all([
        getDocs(collection(db, "clientRequirements")),
        getDocs(collection(db, "contactMessages")),
      ]);

      const requirements: Inquiry[] = requirementsSnapshot.docs.map(
        (item) => ({
          id: item.id,
          source: "SEO Requirement",
          data: item.data(),
        })
      );

      const messages: Inquiry[] = messagesSnapshot.docs.map((item) => ({
        id: item.id,
        source: "Contact Message",
        data: item.data(),
      }));

      const allInquiries = [...requirements, ...messages].sort(
        (first, second) =>
          getDateValue(second.data) - getDateValue(first.data)
      );

      setInquiries(allInquiries);
    } catch (loadError) {
      console.error(loadError);

      setError(
        "Unable to load inquiries. Check Firebase configuration and Firestore rules."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadInquiries();
  }, []);

  const requirementCount = inquiries.filter(
    (item) => item.source === "SEO Requirement"
  ).length;

  const messageCount = inquiries.filter(
    (item) => item.source === "Contact Message"
  ).length;

  return (
    <section className="admin-dashboard">
      <div className="admin-dashboard-heading">
        <div>
          <div className="section-kicker">Client submissions</div>
          <h2>Requirements and messages</h2>
          <p>Click an item to read every detail sent by a visitor.</p>
        </div>

        <button
          type="button"
          className="button button-secondary"
          onClick={loadInquiries}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Refresh"}
        </button>
      </div>

      <div className="admin-stats">
        <b>
          {requirementCount}
          <small>Requirements</small>
        </b>

        <b>
          {messageCount}
          <small>Messages</small>
        </b>

        <b>
          {inquiries.length}
          <small>Total inquiries</small>
        </b>
      </div>

      {error && <p className="form-error">{error}</p>}

      {isLoading ? (
        <p>Loading client submissions...</p>
      ) : inquiries.length > 0 ? (
        <div className="admin-inquiry-list">
          {inquiries.map((inquiry) => (
            <InquiryCard
              key={`${inquiry.source}-${inquiry.id}`}
              inquiry={inquiry}
            />
          ))}
        </div>
      ) : (
        <p>No client requirements or contact messages have been received yet.</p>
      )}
    </section>
  );
}
