export const useMainStore = defineStore("mainStore", () => {
  const supabaseClient = useSupabaseClient();
  const user = useSupabaseUser();
  const businessInfo = ref({
    id: null,
    name: "",
    description: "",
    logo_url: "",
  });
  const businessServices = ref([]);
  const currBusinessUrl = ref('')
  const users = ref([]);
  const formStep = ref(2);
  const businessEmployees = ref([]);


  //getters
  const isOwner = computed(() => {
    if(!user?.value) return false;
    return (user.value?.app_metadata.owner === '1')
  })


  //actions
  const createCompany = async () => {
    try {
      const { data, error } = await supabaseClient
          .from("companies")
          .insert(businessInfo.value)
          .select();

      if (error) throw error;
      console.log(data, "dataaaaa");
      businessInfo.value = data[0];
      formStep.value++;
    } catch (error) {
      alert(error);
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
      alert(error.message);
    }
  };

  const deleteCompany = async () => {
    const { data, error } = await supabaseClient
        .from("companies")
        .delete()
        .match({ id: businessInfo.value.id || 14 });

    console.log(data, "dataaaa");
  };

  const addServices = async (service) => {
    try {
      console.log(businessServices.value, "businessServices");
      if (businessServices.value.length <= 0) {
        return console.log("no businessServices");
      }
      const { data, error } = await supabaseClient
          .from("services")
          .insert(service)
          .select();
      if (error) throw error;
        businessServices.value.push(data[0])
    } catch (error) {
      alert(error);
    }
  };

  const updateService = async (service) => {
    try {
      const {data, error} = await supabaseClient
          .from('services')
          .update(service)
          .eq('id', service.id)
          .select();

      if(error) throw error;
      console.log(data, 'dataaa');
      const idx = businessServices.value.findIndex(x => x.id === service.id);
      businessServices.value.splice(idx, 1, data[0]);
    } catch (e) {
      alert(e.message)
    }
  }

  const searchUsers = async (text) => {
    try {
      const { data, error } = await supabaseClient
          .from("profiles")
          .select()
          .neq('employed', true)
          .ilike("full_name", `%${text}%`);

      if (error) throw error;
      console.log(data, "useeerss");
      users.value = data;
    } catch (error) {
      alert(error);
    }
  };

  const checkForCompany = async () => {
    if(!user?.value) return;
    console.log(user.value.id, "useraaaaa");
    try {
      const { data, error } = await supabaseClient
          .from("companies")
          .select(`*, services (*), employees (*)`)
          .eq("company_owner", user.value.id);

      if (error) throw error;
      if(data[0]) {
        const {services, employees, ...rest} = data[0];
        currBusinessUrl.value = rest.url;
        businessInfo.value = rest;
        console.log(employees, 'employees')
        businessEmployees.value = employees;
        businessServices.value = services;
      }
    } catch (error) {
      alert(error);
    }
  };

  const checkForEmployees = async () => {
    try {
      const {data, error} = await supabaseClient
          .from('employees')
          .select()
          .eq('company_id', businessInfo.value.id);
      if(error) throw error;
      businessEmployees.value = data
      console.log(data, 'dataa')
    } catch (e) {
      alert(e);
    }
  }

  const addEmployees = async () => {
    try {
      const {data, error} = await supabaseClient
          .from('employees')
          .insert(businessEmployees.value)
          .select();

      if(error) throw error
      businessEmployees.value = data;
      formStep.value++;
    } catch (error) {

    }
  }

  const deleteEmployee = async (user_id) => {
    try {
      const {data, error} = await supabaseClient
          .from('employees')
          .delete()
          .eq('user_id', user_id);
      if(error) throw error;
    } catch (error) {
      alert(error)
    }
  }

  return {
    businessInfo,
    formStep,
    businessServices,
    users,
    businessEmployees,
    currBusinessUrl,
    searchUsers,
    createCompany,
    checkForCompany,
    checkForEmployees,
    addServices,
    updateService,
    updateCompany,
    addEmployees,
    deleteEmployee,
    isOwner,
    deleteCompany,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMainStore, import.meta.hot));
}
