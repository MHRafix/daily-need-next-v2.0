import { IoMdNotificationsOutline } from "react-icons/io";

export const admin_pannel_navigation = [
  {
    _id: 1,
    main_nav: "Dashboard",
    main_nav_icon: "D",
    main_nav_link: "/admin_dashboard",
  },
  {
    _id: 2,
    main_nav: "Manage Products",
    main_nav_icon: "H",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all products",
        sub_nav_link: "/manage_products/all_products",
      },
      {
        _id: 2,
        sub_nav_name: "sale products",
        sub_nav_link: "/manage_products/sale_products",
      },
      {
        _id: 3,
        sub_nav_name: "fixed products",
        sub_nav_link: "/manage_products/fixed_products",
      },
      {
        _id: 4,
        sub_nav_name: "limited products",
        sub_nav_link: "/manage_products/limited_offers_products",
      },
      {
        _id: 5,
        sub_nav_name: "stock-in products",
        sub_nav_link: "/manage_products/stockin_products",
      },
      {
        _id: 6,
        sub_nav_name: "stock-out products",
        sub_nav_link: "/manage_products/stockout_products",
      },
    ],
  },
  {
    _id: 3,
    main_nav: "Manage Orders",
    main_nav_icon: "O",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "place custom order",
        sub_nav_link: "/manage_orders/place_custom_order",
      },
      {
        _id: 2,
        sub_nav_name: "all orders",
        sub_nav_link: "/manage_orders/all_orders",
      },
      {
        _id: 3,
        sub_nav_name: "pendding orders",
        sub_nav_link: "/manage_orders/pendding_orders",
      },
      {
        _id: 4,
        sub_nav_name: "inprogress orders",
        sub_nav_link: "/manage_orders/inprogress_orders",
      },
      {
        _id: 5,
        sub_nav_name: "completed orders",
        sub_nav_link: "/manage_orders/completed_orders",
      },
      {
        _id: 6,
        sub_nav_name: "canceled orders",
        sub_nav_link: "/manage_orders/canceled_orders",
      },
    ],
  },
  {
    _id: 4,
    main_nav: "Authentication",
    main_nav_icon: "A",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "admin login",
        sub_nav_link: "/authentication/admin_login",
      },
      {
        _id: 2,
        sub_nav_name: "create users",
        sub_nav_link: "/authentication/create_users",
      },
      {
        _id: 3,
        sub_nav_name: "forgot password",
        sub_nav_link: "/authentication/forgot_password",
      },
      {
        _id: 4,
        sub_nav_name: "lock screen",
        sub_nav_link: "/authentication/unlock_screen",
      },
      {
        _id: 5,
        sub_nav_name: "unlock screen",
        sub_nav_link: "/authentication/lock_screen",
      },
    ],
  },

  {
    _id: 5,
    main_nav: "My Profile",
    main_nav_icon: "P",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "profile dashboard",
        sub_nav_link: "/my_profile/my_profile_dashboard",
      },
      {
        _id: 2,
        sub_nav_name: "edit profile details",
        sub_nav_link: "/my_profile/edit_profile_details",
      },
    ],
  },

  {
    _id: 6,
    main_nav: "Mail Box",
    main_nav_icon: "M",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all mails",
        sub_nav_link: "/mail_box/all_mails",
      },
      {
        _id: 2,
        sub_nav_name: "mail inbox",
        sub_nav_link: "/mail_box/mail_inbox",
      },
      {
        _id: 3,
        sub_nav_name: "compose mail",
        sub_nav_link: "/mail_box/sent_mail",
      },
      {
        _id: 4,
        sub_nav_name: "sent mail",
        sub_nav_link: "/mail_box/compose_mail",
      },
    ],
  },
  {
    _id: 7,
    main_nav: "Users",
    main_nav_icon: "U",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all users",
        sub_nav_link: "/users/all_users",
      },
      {
        _id: 2,
        sub_nav_name: "all customers",
        sub_nav_link: "/users/all_customers",
      },
      {
        _id: 3,
        sub_nav_name: "all admin",
        sub_nav_link: "/users/all_admin",
      },
      {
        _id: 4,
        sub_nav_name: "all moderator",
        sub_nav_link: "/users/all_moderator",
      },
    ],
  },
  {
    _id: 8,
    main_nav: "Manage Sliders",
    main_nav_icon: "S",
    sub_navs: [
      {
        _id: 1,
        sub_nav_name: "all sliders",
        sub_nav_link: "/manage_sliders/all_sliders",
      },
      {
        _id: 2,
        sub_nav_name: "add slider",
        sub_nav_link: "/manage_sliders/add_slider",
      },
    ],
  },
  {
    _id: 9,
    main_nav: "notification list",
    main_nav_link: "/notification_list",
    main_nav_icon: <IoMdNotificationsOutline />,
  },
];
