async function test() {
  try {
    const res = await fetch("https://api.termicons.com/jkt48/live?fields=room_url_key|main_name|image|view_num|started_at|is_live|live_url", {
        headers: {
            "x-api-key": "GECI_ed1d0c1d5d50c83f4a6006fa3e203a0089182c3109423970"
        }
    });
    console.log("Status:", res.status);
    const json = await res.json();
    console.log(JSON.stringify(json, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
