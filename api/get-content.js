export default async function handler(req, res) {
    const GITHUB_REPO = "SyuneHovan/syuniq";
    const FILE_PATH = "content.html";
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 

    const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

    try {
        const response = await fetch(url, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const data = await response.json();

        res.status(200).send(data);

        if (data.content) {
            const content = Buffer.from(data.content, "base64").toString("utf8");
            res.status(200).send(content);
        } else {
            res.status(404).send("File not found");
        }
    } catch (error) {
        res.status(500).send("Error fetching content");
    }
}