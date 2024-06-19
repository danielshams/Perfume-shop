import supabase from "./supabase";

export async function getPerfumes() {
  const { data, error } = await supabase.from("Perfumes").select("*");
  if (error) {
    throw new Error("perfumes could not be loaded");
  }
  return data;
}

export async function fetchPerfume({ queryKey }) {
  const [, id] = queryKey;
  const { data, error } = await supabase
    .from("Perfumes")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error("perfume could not be loaded");
  }
  return data ? data[0] : null;
}
