export const loadUsers = async (inputValue: string) => {
    const response = await fetch(`https://dummyjson.com/users/search?q=${inputValue}`);
    const data = await response.json();
    return data.users.map((user: { id: any; firstName: any; lastName: any, image:any }) => ({ value: user.id, label: `${user.firstName} ${user.lastName}`, image: user.image }));
  };

export const loadApps = async (inputValue: string) => {
    try {
      const response = await fetch(
        "http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/ws/RSS/topfreeapplications/limit=100/genre=6007/json"
      );
      if (!response.ok) throw new Error("Failed to fetch apps");
      const data = await response.json();
      return data.feed.entry  
        .filter((app: { "im:name": { label: string }; }) =>
          app["im:name"].label.toLowerCase().includes(inputValue.toLowerCase())
        )
        .map((app: { "im:name": { label: string }; id: { label: string }; "im:image": { label: string }[] }) => ({
          label: app["im:name"].label, // App Name
          value: app.id.label, // App ID
          image: app["im:image"][2].label, // Medium-sized app icon
        }));
    } catch (error) {
      console.error("Error fetching apps:", error);
      return [];
    }
  };
export const customOption = (props: { data: any; innerRef: any; innerProps: any; }) => {

    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="flex items-center p-2 hover:bg-[#DEEBFF]">
        <img
          src={data.image}
          alt={data.label}
          className="w-8 h-8 rounded-full mr-2"           
        />
        {data.label}
      </div>
    );
  };