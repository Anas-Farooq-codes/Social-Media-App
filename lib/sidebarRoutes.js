
export const sidebarRoutes = (user) => [

    {
        name: "Home",
        icon: "eva:home-fill",
        route: "/",
   },
   {
    name: "Profile",
    icon: "bi-person-fill",
    route: `/profile/${user?.id}`,
},

]