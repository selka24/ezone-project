export const useMainStore = defineStore("mainStore", () => {
  const supabaseClient = useSupabaseClient();

  const businessInfo = ref({
    name: "",
    description: "",
    url: "",
  });
  const services = ref([]);
  const users = ref([]);
  const formStep = ref(2);

  const createCompany = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("companies")
        .insert(businessInfo.value)
        .select();

      if (error) throw response.error;
      console.log(data, "dataaaaa");
      businessInfo.value = data[0];
      formStep.value++;
    } catch (error) {
      alert(error, "errorr");
    }
  };

  const updateCompany = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("companies")
        .update(businessInfo.value)
        .match({ id: businessInfo.value.id });
      if (error) throw error;
    } catch (error) {
      alert(error);
    }
  };

  const deleteCompany = async () => {
    const { data, error } = await supabaseClient
      .from("companies")
      .delete()
      .match({ id: businessInfo.value.id || 14 });

    console.log(data, "dataaaa");
  };

  const addServices = async () => {
    try {
      console.log(services.value, "services");
      if (services.value.length <= 0) {
        return console.log("no services");
      }
      const { data, error } = await supabaseClient
        .from("services")
        .insert(services.value)
        .select();
      if (error) throw error;
      console.log(data, "services inserted");
    } catch (error) {
      alert(error);
    }
  };

  const searchUsers = async (text) => {
    try {
      const { data, error } = await supabaseClient
        .from("profiles")
        .select()
        .ilike("full_name", `%${text}%`);

      if (error) throw error;
      console.log(data, "useeerss");
      users.value = data;
    } catch (error) {
      alert(error);
    }
  };

  return {
    businessInfo,
    formStep,
    services,
    users,
    searchUsers,
    createCompany,
    addServices,
    updateCompany,
    deleteCompany,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
