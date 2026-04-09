async function test() {
  try {
    const resLive = await fetch("https://api.termicons.com/jkt48/live?fields=room_url_key|main_name|image|view_num|started_at|is_live|live_url", {
        headers: { "x-api-key": "GECI_ed1d0c1d5d50c83f4a6006fa3e203a0089182c3109423970" }
    });
    const jsonLive = await resLive.json();
    console.log("Live Keys:", Object.keys(jsonLive));
    if (jsonLive.data) console.log("Live Data Keys:", Object.keys(jsonLive.data));
    
    const resMembers = await fetch("https://api.termicons.com/jkt48/members?fields=name|nickname|photo|slug|team", {
        headers: { "x-api-key": "GECI_ed1d0c1d5d50c83f4a6006fa3e203a0089182c3109423970" }
    });
    const jsonMembers = await resMembers.json();
    console.log("Members Keys:", Object.keys(jsonMembers));
    if (jsonMembers.data) console.log("Members Data Keys:", Object.keys(jsonMembers.data));
  } catch (e) {
    console.error(e);
  }
}

test();
