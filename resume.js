const resume = window.RESUME;
const documentCollections = ["analysis", "portfolio"];
const fileOrder = new Intl.Collator("zh-CN", { numeric: true, sensitivity: "base" });

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

async function loadPdfIndex() {
  if (location.protocol === "file:") return window.LOCAL_PDF_FILES;

  try {
    const response = await fetch("./pdf-index.json", { cache: "no-cache" });
    if (!response.ok) return null;
    const files = await response.json();
    return Array.isArray(files) ? files : null;
  } catch {
    return null;
  }
}

function renderCollection(key, files) {
  const list = document.getElementById(`${key}-documents`);
  const folder = `documents/${key}/`;
  const documents = files?.filter(file =>
    typeof file === "string" && file.startsWith(folder) && /\.pdf$/i.test(file)
  ).sort(fileOrder.compare) ?? [];

  if (!documents.length) {
    const empty = document.createElement("li");
    empty.className = "empty-documents";
    empty.textContent = files ? "暂无 PDF" : "暂时无法读取 PDF 列表";
    list.append(empty);
  }

  for (const file of documents) {
    const segments = file.split("/");
    const name = segments.at(-1).slice(0, -4);
    const entry = document.createElement("li");
    const row = document.createElement("a");
    row.className = "document-row";
    row.href = `./${segments.map(encodeURIComponent).join("/")}`;

    const icon = document.createElement("span");
    icon.className = "document-icon";
    icon.setAttribute("aria-hidden", "true");
    const title = document.createElement("span");
    title.className = "document-title";
    title.textContent = name;
    title.title = name;
    const format = document.createElement("span");
    format.className = "document-format";
    format.textContent = "PDF";
    row.append(icon, title, format);
    entry.append(row);
    list.append(entry);
  }

  if (list.scrollHeight > list.clientHeight) list.tabIndex = 0;
}

const title = resume.siteTitle || "个人简历";
document.title = title;
setText("footer-name", title);
setText("profile-name", resume.name);
setText("intro-name", resume.name);
setText("profile-role", resume.role);
setText("bio", resume.bio);
document.getElementById("download").download = resume.downloadName || "个人简历.pdf";

if (resume.photo) {
  const portrait = document.getElementById("portrait");
  const photo = document.createElement("img");
  photo.alt = `${resume.name}的照片`;
  photo.addEventListener("load", () => portrait.replaceChildren(photo), { once: true });
  photo.src = resume.photo;
}

if (resume.education) {
  setText("education-school", resume.education.school);
  setText("education-program", resume.education.program);
  setText("education-period", resume.education.period);
  document.getElementById("education-section").hidden = false;
}

const skills = document.getElementById("skills");
for (const skill of resume.skills) {
  const item = document.createElement("li");
  item.textContent = skill;
  skills.append(item);
}
document.getElementById("skills-section").hidden = !resume.skills.length;

const contacts = document.getElementById("contacts");
for (const [key, label] of [["wechat", "微信"], ["qq", "QQ"], ["email", "邮箱"]]) {
  const value = resume.contacts[key];
  const term = document.createElement("dt");
  term.textContent = label;
  const detail = document.createElement("dd");

  if (key === "email" && value) {
    const mail = document.createElement("a");
    mail.href = `mailto:${encodeURIComponent(value).replace("%40", "@")}`;
    mail.textContent = value;
    detail.append(mail);
  } else {
    detail.textContent = value || "未填写";
  }

  contacts.append(term, detail);
}

for (const key of documentCollections) setText(`${key}-title`, resume[key].title);
loadPdfIndex().then(files => {
  for (const key of documentCollections) renderCollection(key, files);
});
