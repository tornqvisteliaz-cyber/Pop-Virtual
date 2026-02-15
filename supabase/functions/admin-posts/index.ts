import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { password } = body;

    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!password || password !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Invalid password" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const resource = body.resource || "posts";

    // ── Fleet operations ──
    if (resource === "fleet") {
      const { action, id, type, role, cargo, sort_order } = body;

      if (action === "delete" && id) {
        const { error } = await supabase.from("fleet").delete().eq("id", id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (action === "update" && id) {
        const updates: Record<string, unknown> = {};
        if (type !== undefined) updates.type = type;
        if (role !== undefined) updates.role = role;
        if (cargo !== undefined) updates.cargo = cargo;
        if (sort_order !== undefined) updates.sort_order = sort_order;
        const { error } = await supabase.from("fleet").update(updates).eq("id", id);
        if (error) throw error;
        return new Response(JSON.stringify({ success: true }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // create
      if (!type || !role) {
        return new Response(JSON.stringify({ error: "Type and role required" }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const { data, error } = await supabase
        .from("fleet")
        .insert({ type, role, cargo: cargo || false, sort_order: sort_order || 0 })
        .select()
        .single();
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, fleet: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Posts operations (existing) ──
    const { title, content, category, action, postId } = body;

    if (action === "delete" && postId) {
      const { error } = await supabase.from("posts").delete().eq("id", postId);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!title || !content) {
      return new Response(JSON.stringify({ error: "Title and content required" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data, error } = await supabase
      .from("posts")
      .insert({ title, content, category: category || "news" })
      .select()
      .single();
    if (error) throw error;

    return new Response(JSON.stringify({ success: true, post: data }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
