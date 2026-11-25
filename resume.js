const resume = window.RESUME;

function setText(id, value) {
  document.getElementById(id).textContent = value;
}

function cloudUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

function renderCollection(key) {
  const section = resume[key];
  setText(`${key}-title`, section.title);
  setText(`${key}-nav`, section.title);
  const list = document.getElementById(`${key}-documents`);

  if (!section.items.length) {
    const empty = document.createElement("li");
    empty.className = "empty-documents";
    empty.textContent = "暂无文档";
    list.append(empty);
  }

  for (const item of section.items) {
    const href = cloudUrl(item.url);
    const entry = document.createElement("li");
    const row = document.createElement(href ? "a" : "div");
    row.className = "document-row";

    if (href) {
      row.href = href;
      row.target = "_blank";
      row.rel = "noopener noreferrer";
    }

    const icon = document.createElement("span");
    icon.className = "document-icon";
    icon.setAttribute("aria-hidden", "true");
    const title = document.createElement("span");
    title.className = "document-title";
    title.textContent = item.title;
    const status = document.createElement("span");
    status.className = "document-status";
    status.textContent = href ? "打开文档" : "待添加链接";
    if (href) status.setAttribute("aria-label", "在新标签页打开文档");
    row.append(icon, title, status);
    entry.append(row);
    list.append(entry);
  }
}

const title = resume.siteTitle || "个人简历";
document.title = title;
setText("site-title", title);
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

renderCollection("analysis");
renderCollection("portfolio");
