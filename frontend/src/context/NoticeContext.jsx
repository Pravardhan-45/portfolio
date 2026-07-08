import { createContext, useCallback, useContext, useState } from "react";

const NoticeContext = createContext({ notify: () => {} });

export const useNotice = () => useContext(NoticeContext);

let noticeId = 0;

export function NoticeProvider({ children }) {
  const [notices, setNotices] = useState([]);

  const notify = useCallback((message, type = "info") => {
    const id = ++noticeId;
    setNotices((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setNotices((current) => current.filter((n) => n.id !== id));
    }, 4500);
  }, []);

  return (
    <NoticeContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm px-4 sm:px-0 pointer-events-none">
        {notices.map((n) => (
          <div
            key={n.id}
            className="animate-fade-in-up bg-white border-l-4 border-indigo-500 shadow-xl rounded-xl px-5 py-4 flex items-start gap-3 pointer-events-auto"
          >
            <span className="text-xl">📝</span>
            <p className="text-slate-700 font-medium text-sm">{n.message}</p>
          </div>
        ))}
      </div>
    </NoticeContext.Provider>
  );
}
