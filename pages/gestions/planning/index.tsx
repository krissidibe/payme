import React, { useEffect, useState } from "react";
import InputComponent from "../../../components/UI/InputComponent";
import { BiCheckDouble, BiSearch } from "react-icons/bi";
import { IoMdAddCircle, IoMdClose, IoMdTrash } from "react-icons/io";
import { IoListSharp } from "react-icons/io5";
import { BsCheck, BsCheck2 } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import {
  BsFillCalendarCheckFill,
  BsFillCalendar2WeekFill,
} from "react-icons/bs";
import DropdownPlanningItem from "../../../components/menu/DropdownPlanningItem";
import { Menu, Switch } from "@headlessui/react";
import { RiCalendarTodoFill, RiFileEditLine } from "react-icons/ri";
import ButtonComponent from "../../../components/UI/ButtonComponent";
import {
  MdAccessTimeFilled,
  MdCalendarViewDay,
  MdMoreHoriz,
} from "react-icons/md";
import {
  addNewPlanning,
  deletePlanning,
  fetchAllPlanning,
  updatePlanning,
} from "../../../services/planningService";

import { useGlobalModal } from "../../../utils/use-global-modal";
import {
  addNewPlanningItem,
  deletePlanningItem,
  fetchAllPlanningItem,
  fetchAllWeekPlanningItem,
  searchAllPlanningItem,
  todayAllPlanningItem,
  togglePlanningItem,
  updatePlanningItem,
} from "../../../services/planningItemService";
import { daysFr } from "../../../utils/helpers";
import DropdownPlanningItemOption from "../../../components/menu/DropdownPlanningItemOption";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/router";
function Planning(props) {
  const [colorItemSelect, setColorItemSelect] = useState(0);
  const primariesList = [
    "bg-gray-300",
    "bg-yellow-500",
    "bg-amber-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const primaries = [
    "bg-[#D2D2D2]",
    "bg-[#FFC107]",
    "bg-[#FF9800]",
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
  ];

  const getIconColorIndex = (key) => {
    if (key == "gray-300") {
      return 0;
    } else if (key == "yellow-500") {
      return 1;
    } else if (key == "amber-500") {
      return 2;
    } else if (key == "purple-500") {
      return 3;
    } else if (key == "blue-500") {
      return 4;
    } else if (key == "green-500") {
      return 5;
    }
  };
  const getIconColor = (key) => {
    let color = "bg-red-400";
    if (key == "bg-[#D2D2D2]") {
      return "bg-gray-500";
    } else if (key == "bg-[#FFC107]") {
      return "bg-[#9E7808]";
    } else if (key == "bg-[#FF9800]") {
      return "bg-[#9e6e26]";
    } else if (key == "bg-purple-500") {
      return "bg-purple-700";
    } else if (key == "bg-blue-500") {
      return "bg-blue-700";
    } else if (key == "bg-green-500") {
      return "bg-green-400";
    }

    return "color";
  };

  const [showIndex, setShowIndex] = useState(0);
  const [addNewListModal, setAddNewListModal] = useState(false);
  const [addNewItem, setAddNewItem] = useState(false);
  const [doneTodo, setDoneTodo] = useState(false);
  const [showItmeTodo, setShowItmeTodo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isNewListItem, setIsNewListItem] = useState(true);
  const [isLoadingItem, setIsLoadingItem] = useState(true);
  const modal = useGlobalModal();

  const [planning, setPlanning] = useState<Planning[]>([]);
  const [planningItem, setPlanningItem] = useState<PlanningItem[]>([]);
  const [currentplanning, setCurrentPlanning] = useState<Planning>();
  const [currentplanningModal, setCurrentPlanningModal] = useState<Planning>();
  //searchAllPlanningItem

  const [searchValue, setSearchValue] = useState("");
  const [time, setTime] = useState("");
  const [showToday, setShowToday] = useState(false);
  const [showWeek, setShowWeek] = useState(false);
  const [datasFiltered, setDatasFiltered] = useState<any[]>([]);
  const [todayDatas, setTodayDatas] = useState<any[]>([]);
  const [WeekDatas, setWeekDatas] = useState<any[]>([]);
  const router = useRouter();
  const planningInfoDashboard = router.query;
  useEffect(() => {
    if (planningInfoDashboard.id) {
      console.log(planningInfoDashboard);
    }

    (async () => {
      const datas = await searchAllPlanningItem(searchValue);

      const datasToday = await todayAllPlanningItem();
      
      let date_today = new Date();

      let first_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 1)
      );

      let last_day_of_the_week = new Date(
        date_today.setDate(date_today.getDate() - date_today.getDay() + 6 + 1)
      );

      const datasWeek = await fetchAllWeekPlanningItem(
        first_day_of_the_week,
        last_day_of_the_week
      );

      setTodayDatas((x) => (x = datasToday));

      setWeekDatas((x) => (x = datasWeek));

      setDatasFiltered((x) => (x = datas));

      setShowToday((x) => (x = x));
      setDoneTodo((x) => (x = x));
    })();
  }, [searchValue, isLoadingItem]);

  const [currentplanningItem, setCurrentPlanningItem] = useState<PlanningItem>({
    name: "",
    color: "",
    content: "",
    date: null,
    isCompleted: false,
  });
  const handleChangeItem = (e) => {
    const { name, value } = e.target;
    setCurrentPlanningItem((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [listName, setListName] = useState("");
  useEffect(() => {
    (async () => {
      //const dataProjects = await fetchAllProject();
      //setProjects(dataProjects);
      setPlanningItem(await fetchAllPlanningItem(currentplanning?.id));

      setIsLoadingItem(false);
    })();

    return () => {};
  }, [isLoadingItem]);

  const fetchWeekAllDatas = async (startAt, endAt) => {
    const datas = await fetchAllWeekPlanningItem(startAt, endAt);
    setWeekDatas((x) => (x = datas));
    setSearchValue((x) => (x = ""));
    setDoneTodo((x) => (x = false));
    setDatasFiltered((x) => (x = datas as any));

    setShowWeek((x) => (x = true));
  };
  const fetchTodayAllDatas = async () => {
   
    setShowIndex((x) => (x = 1));
    setShowWeek((x) => (x = false));

   
    setSearchValue((x) => (x = ""));
   
    const datas = await todayAllPlanningItem();
    setDoneTodo((x) => (x = x));
    setDatasFiltered((x) => (x = datas));

    setShowToday((x) => (x = true));
  };

  useEffect(() => {
    (async () => {
      //const dataProjects = await fetchAllProject();
      //setProjects(dataProjects);
      setPlanning(await fetchAllPlanning());

      //  setIsLoading(false);
      setIsLoading(false);
    })();

    return () => {};
  }, [isLoading]);
  return (
    <div className="flex w-full h-full overflow-y-scroll select-none no-scrollbar">
      {(addNewListModal || showItmeTodo) && (
        <div
          onClick={() => {
            setAddNewListModal(false);
            setShowItmeTodo(false);
            setListName("");
          }}
          className="absolute inset-0 z-10 flex items-center justify-center opacity-100 bg-black/50 "
        ></div>
      )}

      {showItmeTodo && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="z-50 ">
            <ItemCard isPopup={true} />
          </div>
        </div>
      )}
      {addNewListModal ||
        (addNewItem && (
          <div
            onClick={() => {
              setAddNewListModal(false);
              setAddNewItem(false);
              setListName("");
            }}
            className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 "
          ></div>
        ))}
      {addNewListModal && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="relative bg-[#212121] z-50  w-[520px] p-5 py-6 rounded-xl">
            <div className="flex items-center justify-between">
              {" "}
              <p className="text-xl font-bold">
                {!isNewListItem ? "Modifier la" : "Ajouter une"} liste{" "}
              </p>{" "}
              <IoMdClose
                onClick={() => {
                  setAddNewListModal(false);
                  setListName("");
                }}
                className="w-6 h-6 text-white cursor-pointer "
              />{" "}
            </div>

            <div className="bg-[#323232]/30 gap-4 p-4 mt-4 rounded-md flex justify-center items-center flex-col">
              <div className="flex items-center gap-2 py-4 pr-2">
                {primariesList.map((item, index) => (
                  <div
                    onClick={() => {
                      setColorItemSelect((x) => (x = index));
                      setCurrentPlanningItem((prevState) => ({
                        ...prevState,
                        color: primariesList[index],
                      }));
                    }}
                    className={`${primariesList[index]}  ${
                      index == colorItemSelect
                        ? "w-[60px] h-[60px]"
                        : "w-[30px] h-[30px]"
                    } cursor-pointer rounded-full flex items-center justify-center`}
                  >
                    {/*  <IoListSharp className={` ${index == colorItemSelect ? "  w-[45px] h-[45px]" :"  w-[35px] h-[35px]" }       `} /> */}
                  </div>
                ))}
              </div>
              {/*  <div className="flex items-center  justify-center w-[60px] h-[60px]  bg-blue-500 rounded-full">
                <IoListSharp className="w-[45px] h-[45px] " />
              </div> */}
              <InputComponent
                key={300}
                value={listName}
                onChange={(e) => {
                  setListName(e.target.value);
                }}
                placeholder="Nom de la liste"
                className="rounded-[10px] placeholder:text-center  text-[16px] border-opacity-30 focus:border-[#ffffff]"
              />
            </div>

            <div className="flex items-center justify-center w-full gap-5 mt-0">
              {/*     <ButtonComponent
                handleClick={() => {
                  setAddNewListModal(false);
                }}
                label={"Annuler"}
                className="max-h-[36px] min-w-[120px] mt-6 mb-4 shadow-xl cursor-pointer shadow-black/20 bg-[#484848] border-none  rounded-md"
              /> */}
              <ButtonComponent
                key={32}
                handleClick={async () => {
                  if (listName.length < 3) {
                    return;
                  }

                  setIsLoading(false);
                  const data = !isNewListItem
                    ? await updatePlanning(
                        currentplanningModal?.id,
                        listName,
                        primariesList[colorItemSelect]
                      )
                    : await addNewPlanning({
                        name: listName,
                        color: primariesList[colorItemSelect]
                          .toString()
                          .replace("bg-", ""),
                      });
                  if (data) {
                    setAddNewListModal(false);
                    setIsLoading(true);
                    if (currentplanning?.name != undefined) {
                      currentplanning.name =
                        currentplanning?.id == currentplanningModal?.id
                          ? listName
                          : currentplanning?.name;
                    }

                    setListName("");
                  }
                }}
                label={!isNewListItem ? "Modifier" : "Ajouter"}
                labelClassName="text-[15px]"
                className={`  w-[130px] mt-6 mb-4 shadow-xl  shadow-black/20 bg-[#9a9768] border-none   ${
                  listName.length >= 3
                    ? "opacity-100 cursor-pointer "
                    : "opacity-30 cursor-default  "
                }`}
              />
            </div>
          </div>
        </div>
      )}

      {addNewItem && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <div className="relative bg-[#212121] z-50  w-[520px] p-5 py-6 rounded-xl">
            <div className="flex items-center justify-between pl-3">
              {" "}
              <p className="text-xl font-bold">
                {currentplanningItem?.id ? "Modifier" : "Ajouter"} une tâche{" "}
              </p>{" "}
              <div className="flex items-center justify-center gap-8">
                <div className="flex items-center gap-2 pr-2">
                  {primaries.map((item, index) => (
                    <div
                      onClick={() => {
                        setColorItemSelect((x) => (x = index));
                        setCurrentPlanningItem((prevState) => ({
                          ...prevState,
                          color: primaries[index],
                        }));
                      }}
                      className={`${primaries[index]}  ${
                        index == colorItemSelect
                          ? "w-[19px] h-[19px]"
                          : "w-[13px] h-[13px]"
                      } cursor-pointer rounded-full`}
                    ></div>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  {currentplanningItem?.id && (
                    <div className="bg-[#ffffff0c] rounded-full p-1 mr-2 ">
                      <svg
                        onClick={async () => {
                          modal.onSubmit = (
                            <ButtonComponent
                              handleClick={async () => {
                                setIsLoadingItem(false);
                                const data = await deletePlanningItem(
                                  currentplanningItem?.id
                                );

                                if (data) {
                                  modal.onClose();
                                  setAddNewItem(false);
                                  setIsLoadingItem(true);
                                  
                                }

                                (async () => {
                                  const datasToday = await todayAllPlanningItem();
                                  setTodayDatas((x) => (x = datasToday));
          
                                  let date_today = new Date();
          
                                  let first_day_of_the_week = new Date(
                                    date_today.setDate(date_today.getDate() - date_today.getDay() + 1)
                                  );
                            
                                  let last_day_of_the_week = new Date(
                                    date_today.setDate(date_today.getDate() - date_today.getDay() + 6 + 1)
                                  );
                            
                                  const datasWeek = await fetchAllWeekPlanningItem(
                                    first_day_of_the_week,
                                    last_day_of_the_week
                                  );
                            
                                  setWeekDatas((x) => (x = datasWeek));
                                })();
                              }}
                              label={"Supprimer"}
                              className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                            />
                          );
                          modal.onOpen();
                          modal.setTitle("Êtes-vous sûr ?");
                          modal.setMessage(
                            "Voulez-vous vraiment supprimer cette tâche ?"
                          );
                        }}
                        className="w-[16px] h-[16px]   cursor-pointer opacity-60 hover:opacity-100 "
                        width="16"
                        height="20"
                        viewBox="0 0 16 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z"
                          fill="#D8D8D8"
                        />
                        <path
                          d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z"
                          fill="#D8D8D8"
                        />
                      </svg>
                    </div>
                  )}
                  <IoMdClose
                    onClick={() => {
                      setAddNewItem(false);
                      setAddNewListModal(false);
                    }}
                    className="w-6 h-6 text-white cursor-pointer "
                  />{" "}
                </div>
              </div>
            </div>

            <div className="bg-[#323232]/30 gap-2 p-2 mt-4 rounded-md flex justify-center items-center flex-col">
              <InputComponent
                key={21}
                placeholder="Titre"
                name="name"
                value={currentplanningItem?.name}
                onChange={handleChangeItem}
                className="rounded-[10px]    text-[16px] border-opacity-20 focus:border-[#ffffff]"
              />

              <textarea
                value={currentplanningItem?.content}
                onChange={(e) => {
                  setCurrentPlanningItem((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }));
                }}
                className="w-full  p-2 mt-2 outline-none bg-transparent border-opacity-20 border-white  border rounded-[14px] text-sm min-h-[140px] max-h-[140px] p-4   "
              ></textarea>
            </div>
            <div className="bg-[#323232]/30  gap-6 relative  px-2 py-2 mt-1 rounded-md flex  items-center justify-center ">
              {/*    <RiCalendarTodoFill className="w-[34px] h-[34px] bottom-[10px] text-[#9a9768] absolute " /> */}

              <div className="flex flex-1 flex-col text-[15px]   leading-4">
                <InputComponent
                  key={43}
                  // value= {currentplanningItem.date.toString().substring(0,16)}
                  value={
                    currentplanningItem?.date
                      ? currentplanningItem?.date.toString().substring(0, 10)
                      : null
                  }
                  name="date"
                  type="date"
                  onChange={handleChangeItem}
                  className={`${
                    currentplanningItem?.date == null
                      ? "opacity-50"
                      : "opacity-100"
                  } [color-scheme:dark] w-full mb-0 h-[50px]    rounded-xl text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100  `}
                />
              </div>
              <div className="flex flex-1 flex-col text-[15px] max-w-[120px]  leading-4">
                <InputComponent
                  key={44}
                  // value= {currentplanningItem.date.toString().substring(0,16)}
                  //currentplanningItem?.date.toString().substring(11, 16)
                  value={currentplanningItem?.date ? time : null}
                  //name="date"
                  type="time"
                  onChange={(e) => {
                    setTime((x) => (x = e.target.value));
                  }}
                  className={`${
                    currentplanningItem?.date == null
                      ? "opacity-50"
                      : "opacity-100"
                  } [color-scheme:dark] w-full mb-0 h-[50px]   rounded-xl text-[14px] font-light border-opacity-20 focus:border-[#ffffff] focus:border-opacity-100  `}
                />
              </div>
            </div>

            {/*         <div className="bg-[#323232]/30 gap-4 relative p-4 py-3 mt-4 rounded-md flex  items-center ">
              <RiCalendarTodoFill className="w-[34px] h-[34px] bottom-[10px] text-[#9a9768] absolute " />
              <div className="flex flex-1 flex-col text-[15px] ml-12 leading-4">
                <p>Date</p>
                <p className="text-[#9a9768]">13/6/2023</p>
              </div>
              <Switch
                //checked={enabled}
                //onChange={setEnabled}
                className={`${
                  true ? "bg-[#9a9768]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    true ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="bg-[#323232]/30 gap-4 relative p-4 py-3 mt-4 rounded-md flex  items-center ">
              <MdAccessTimeFilled className="w-[34px] h-[34px] bottom-[10px] text-[#9a9768] absolute " />
              <div className="flex flex-1 flex-col text-[15px] ml-12 leading-4">
                <p>Heure</p>
                <p className="text-[#9a9768]">13/6/2023</p>
              </div>
              <Switch
                //checked={enabled}
                //onChange={setEnabled}
                className={`${
                  true ? "bg-[#9a9768]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    true ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
 */}
            <div className="flex items-center justify-end gap-5 pl-[170px] pr-2 mt-0">
              {/*     <ButtonComponent
                handleClick={() => {
                  setAddNewListModal(false);
                }}
                label={"Annuler"}
                className="max-h-[36px] min-w-[120px] mt-6 mb-4 shadow-xl cursor-pointer shadow-black/20 bg-[#484848] border-none  rounded-md"
              /> */}
              <ButtonComponent
                key={101}
                handleClick={() => {
                  setAddNewItem(false);
                }}
                label={"Annuler"}
                labelClassName="text-[15px]"
                className="  w-full mt-6 mb-4 shadow-xl cursor-pointer shadow-black/20 bg-[#484848] border-none  "
              />
              <ButtonComponent
                key={102}
                handleClick={async () => {
                  if (
                    time.length < 4 ||
                    currentplanningItem.date == null ||
                    currentplanningItem.name.length < 3 ||
                    currentplanningItem.content.length < 3
                  ) {
                    return;
                  }

                  
                  const newTime =
                    currentplanningItem.date.toString() + "T" + time;
                  const oldTime =
                    currentplanningItem.date.toString().substring(0, 11) +
                    "T" +
                    time;

                  const oldTimeFormat = oldTime.replace("TT", "T");
                  const finalTime = new Date(
                    currentplanningItem?.id != undefined
                      ? oldTimeFormat
                      : newTime
                  );

                  if (showToday) {
                    currentplanningItem!.date = finalTime;
                    const ddn = await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );

                    if (ddn) {
                      await fetchTodayAllDatas();
                      const datasToday = await todayAllPlanningItem();

                      setTodayDatas((x) => (x = datasToday));
                    }

                    setAddNewItem((x) => (x = false));
                    setIsLoading((x) => (x = false));
                    return;
                  }

                  if (showWeek) {
                    currentplanningItem!.date = finalTime;

                    const ddn = await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );

                    if (ddn) {
                      const datasToday = await todayAllPlanningItem();

                      setTodayDatas((x) => (x = datasToday));
                    }

                    let date_today = new Date();

                    let first_day_of_the_week = new Date(
                      date_today.setDate(
                        date_today.getDate() - date_today.getDay() + 1
                      )
                    );

                    let last_day_of_the_week = new Date(
                      date_today.setDate(
                        date_today.getDate() - date_today.getDay() + 6 + 1
                      )
                    );
                    await fetchWeekAllDatas(
                      first_day_of_the_week,
                      last_day_of_the_week
                    );

                    setAddNewItem((x) => (x = false));
                    setIsLoading((x) => (x = false));
                    return;
                  }

                  //  currentplanningItem!.date = finalTime;

                  if (currentplanningItem!.id) {
                    const newItem = planningItem.map((shape) => {
                      if (shape.id == currentplanningItem.id) {
                        // No change
                        return {
                          ...shape,
                          name: currentplanningItem.name,
                          color: currentplanningItem.color,
                          content: currentplanningItem.content,
                          isCompleted: currentplanningItem.isCompleted,
                          date:
                            currentplanningItem!.date.toString().length <= 10
                              ? (currentplanningItem!.date + "T" + time)
                                  .toString()
                                  .substring(0, 22)
                              : currentplanningItem!.date
                                  .toString()
                                  .substring(0, 11) + time,
                        };
                      } else {
                        // Return a new circle 50px below
                        return shape;
                      }
                    });
                    // Re-render with the new array

                    currentplanningItem!.date = finalTime;
                    await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );

                    setPlanningItem(newItem as PlanningItem[]);
                  } else {
                    currentplanningItem!.date = finalTime;
                    currentplanningItem!.id = uuidv4();
                    const newItem = {
                      id: currentplanningItem.id,
                      name: currentplanningItem.name,
                      color: currentplanningItem.color,
                      content: currentplanningItem.content,
                      isCompleted: false,
                      date: finalTime.toISOString(),
                    };
                    setPlanningItem(
                      (prev) => (prev = [newItem as any, ...prev])
                    );

                    await addNewPlanningItem(
                      currentplanning.id,
                      currentplanningItem
                    );
                  }

                 
                  (async () => {
                   const datasToday = await todayAllPlanningItem();
                   setTodayDatas((x) => (x = datasToday));

                   let date_today = new Date();

                   let first_day_of_the_week = new Date(
                     date_today.setDate(date_today.getDate() - date_today.getDay() + 1)
                   );
             
                   let last_day_of_the_week = new Date(
                     date_today.setDate(date_today.getDate() - date_today.getDay() + 6 + 1)
                   );
             
                   const datasWeek = await fetchAllWeekPlanningItem(
                     first_day_of_the_week,
                     last_day_of_the_week
                   );
             
                   setWeekDatas((x) => (x = datasWeek));
                 })();
                
                  //setIsLoadingItem((x) => (x = true));
                  /*    
              await addNewPlanningItem(
                        currentplanning.id,
                        currentplanningItem
                      ); */

                  //  setPlanningItem([...planningItem,{}]);
                  setAddNewItem(false);

                  //  setIsLoadingItem((x) => (x = false));
                }}
                label={currentplanningItem?.id ? "Modifier" : "Ajouter"}
                labelClassName="text-[15px]"
                className={`  w-full mt-6 mb-4 shadow-xl cursor-pointer shadow-black/20 bg-[#9a9768] border-none   
                
                ${
                  time?.length < 4 ||
                  currentplanningItem.date == null ||
                  currentplanningItem.name.length < 3 ||
                  currentplanningItem.content.length < 3
                    ? "opacity-30"
                    : ""
                }`}
              />
            </div>
          </div>
        </div>
      )}
      {LeftSection()}

      {currentplanning?.id == null &&
        !showToday &&
        !showWeek &&
        searchValue.length < 3 && (
          <div className="flex text-[30px] text-[#3c3c3c] flex-col items-center justify-center w-full h-full ">
            <p>Aucun rappel </p>
          </div>
        )}

      {(currentplanning != null ||
        searchValue.length >= 3 ||
        showToday ||
        showWeek) && (
        <div className="flex flex-col w-full h-full pt-[72px]  overflow-y-scroll no-scrollbar ">
          <div className="flex justify-between w-full pb-4 border-b px-7 border-white/10">
            <p className="text-[32px] font-bold opacity-40">
              {searchValue.length >= 3 &&
                !showToday &&
                !showWeek &&
                "Résultat de la recherche"}
              {showIndex == 0 &&
                searchValue.length < 3 &&
                currentplanning?.name}
              {showIndex == 1 && searchValue.length < 3 && "Aujourd'hui"}
              {showIndex == 2 && searchValue.length < 3 && "Semaine"}
            </p>
            <div className="flex">
              <DropdownPlanningItemOption addActive={showIndex==0} className="">
                {showIndex == 0 && <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        setCurrentPlanning((x) => (x = currentplanning));
                        setListName((x) => (x = currentplanning?.name));
                        setCurrentPlanningModal((x) => (x = currentplanning));
                        setIsNewListItem(false);
                        setAddNewListModal(true);
                      }}
                      className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2    text-[17px] cursor-pointer mx-2 ${
                        active
                          ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                          : " "
                      }`}
                    >
                      <RiFileEditLine className="mr-[2px] min-w-10 min-h-10 " />
                      Modifier
                    </div>
                  )}
                </Menu.Item>}
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={async () => {
                        setDoneTodo((x) => (x = !x));
                      }}
                      className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                        active
                          ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                          : " "
                      }`}
                    >
                      {!doneTodo ? (
                        <AiFillEye className="w-[20px] h-[20px] " />
                      ) : (
                        <AiFillEyeInvisible className="w-[20px] h-[20px] " />
                      )}
                      Rappels terminés
                    </div>
                  )}
                </Menu.Item>
              </DropdownPlanningItemOption>

              {showIndex == 0 && searchValue.length < 3 && (
                <ButtonComponent
                  key={41}
                  label={"Ajouter"}
                  handleClick={() => {
                    setTime((x) => (x = ""));
                    setColorItemSelect(0);
                    setCurrentPlanningItem({
                      name: "",
                      content: "",
                      date: null,
                      color: primaries[0],
                    });
                    setAddNewItem((x) => (x = true));
                  }}
                  className="bg-[#9a9768] border-none    ml-8"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col overflow-y-scroll no-scrollbar  flex-1 px-10 py-4 pl-[50px]">
      
          

          
      {/*       {showWeek && datasFiltered.length == 0 && (
              <div className="flex text-[30px] text-[#3c3c3c] flex-col items-center justify-center w-full h-full ">
                <p>Aucun rappel</p>
              </div>
            )} */}
       
            {(searchValue.length >= 3 || showIndex > 0) &&
              datasFiltered.map((item, index) => (
                <>
                  {/*  {doneTodo &&
                    item.children.filter((item) => item.isCompleted == true)
                      .length != 0 && (
                      <p
                        className={`text-[25px] font-semibold   text-${
                          item.color
                        }  ${
                          index > 0 ? "border-t  pt-2  border-white/10 " : ""
                        }   opacity-100`}
                      >
                        {item.name} 
                      </p>
                    )} */}


               { !doneTodo &&  <div
                    className={`
                  
                    ${
                      item.children.filter(
                        (item) => item.isCompleted == doneTodo
                      ).length != 0
                        ? "border-b-[1px] border-white/10 pt-2"
                        : "hidden"
                    }
                    mt-0 pb-2  ${`text-${item.color}`}  font-bold text-2xl `}
                  >
                    {item.name}
                    <div
                      className={`  flex flex-row flex-wrap pt-3 pb-5 overflow-y-scroll no-scrollbar gap-2 border-white/10 
                 
                 `}
                    >
                      {item.children.map((item) => (
                        <>
                          {!doneTodo && item.isCompleted == false  && (
                            <div className={`p-1 overflow-hidden   `}>
                              
                              <ItemCard
                                key={item.id}
                                item={item}
                                handleClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentPlanningItem(item);
                                  setShowItmeTodo(true);
                                }}
                              />
                            </div>
                          )}

                
                        </>
                      ))}

            
                    </div>
                  </div>}

                  {doneTodo && 
                  
                  <div
                  className={`
                
                  border-b-[1px] border-white/10 pt-2
                  mt-0 pb-2  ${`text-${item.color}`}  font-bold text-2xl `}
                >
                  {item.name}
                  <div
                    className={`  flex flex-row flex-wrap pt-3 pb-5 overflow-y-scroll no-scrollbar gap-2 border-white/10 
               
               `}
                  >
                    {item.children.map((item) => (
                      
                    
                          <div className={`p-1 overflow-hidden   `}>
                           
                            <ItemCard
                              key={item.id}
                              item={item}
                              handleClick={(e) => {
                                e.stopPropagation();
                                setCurrentPlanningItem(item);
                                setShowItmeTodo(true);
                              }}
                            />
                          </div>
                       

              
                     
                    ))}

          
                  </div>
                </div>
                  }
                </>
              ))}

         

            {searchValue.length < 3 && showIndex > 0 && (
              <>
                {(!doneTodo && showIndex == 1 && (todayDatas[0]?.sizeNotCompleted == null || todayDatas[0]?.sizeNotCompleted == 0))  
                   && (
                    <div className="flex items-center justify-center w-full h-screen pb-[100px] text-[30px] text-[#3c3c3c]">
                      Aucun contenu
                    </div>
                  )}
                   {(doneTodo && showIndex == 1 && (todayDatas[0]?.size == null || todayDatas[0]?.size == 0))  
                   && (
                    <div className="flex items-center justify-center w-full h-screen pb-[100px] text-[30px] text-[#3c3c3c]">
                      Aucun contenu
                    </div>
                  )}


{(!doneTodo && showIndex == 2 && (WeekDatas[0]?.sizeNotCompleted  == null || WeekDatas[0]?.sizeNotCompleted  == 0))  
                   && (
                    <div className="flex items-center justify-center w-full h-screen pb-[100px] text-[30px] text-[#3c3c3c]">
                      Aucun contenu
                    </div>
                  )}
 

                   {(doneTodo && showIndex == 2 && (WeekDatas[0]?.size  == null || WeekDatas[0]?.size  == 0))  
                   && (
                    <div className="flex items-center justify-center w-full h-screen pb-[100px] text-[30px] text-[#3c3c3c]">
                      Aucun contenu
                    </div>
                  )}
              </>
            )}

            {searchValue.length < 3 && showIndex == 0 && (
              <div className="mt-0">
                <div className="flex flex-row flex-wrap gap-2 pt-3 pb-5 overflow-y-scroll no-scrollbar border-white/10">
                  {!doneTodo &&
                    planningItem.filter((i) => i.isCompleted == false).length ==
                      0 && (
                      <div className="flex items-center justify-center w-full h-screen pb-[297px] text-[30px] text-[#3c3c3c]">
                        Aucun contenu 
                      </div>
                    )}
                  {/*   {isLoadingItem && [1,2,3,4,5,6,7,8,9,10].map(item=>(

               <ItemCardShimmer  key={item}  />
               )) } */}

                  {!isLoadingItem && (
                    <>
                      {!doneTodo
                        ? planningItem.map((item) => (
                            <div
                              className={`p-1 overflow-hidden ${
                                item.isCompleted == false ? "flex" : "hidden"
                              } `}
                            >
                              <ItemCard
                                key={item.id}
                                item={item}
                                handleClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentPlanningItem(item);
                                  setShowItmeTodo(true);
                                }}
                              />
                            </div>
                          ))
                        : planningItem.map((item) => (
                            <div className={`p-1 overflow-hidden   `}>
                              <ItemCard
                                key={item.id}
                                item={item}
                                handleClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentPlanningItem(item);
                                  setShowItmeTodo(true);
                                }}
                              />
                            </div>
                          ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
  function LeftSection() {
    return (
      <div className=" relative min-w-[401px] max-w-[401px] flex flex-col border-r h-full overflow-y-scroll no-scrollbar pt-[75px] px-5 border-white/10">
        <div className="border-[#5A5A5A] opacity-50  flex flex-row items-center justify-center p-2 rounded-full border-[1px] bg-transparent mb-5 ">
          <BiSearch className="w-6 h-6 ml-2 mr-3" />

          <input
            placeholder="Recherche"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setShowToday((x) => (x = false));
              setShowWeek((x) => (x = false));
              //setCurrentPlanning(x=>x=null);
            }}
            className="w-full bg-transparent rounded-none outline-none placeholder:text-white/70"
          />
        </div>
        <div className="flex justify-between w-full gap-5 ">
          <div
            onClick={async ()=>{
              setSearchValue((x) => (x = ""));
              setShowIndex((x) => (x = 1));
              setShowWeek((x) => (x = false));
          
             
             
              setDoneTodo((x) => (x = false));
              setShowToday((x) => (x = true));
              setTimeout(async() => {
                const datas = await todayAllPlanningItem();
                setDatasFiltered((x) => (x = datas));
              }, 100);
          
            }}
            className="bg-[#1d1d1d] hover:brightness-125 rounded-xl px-4 py-[10px] w-full cursor-pointer "
          >
            
            <div className="flex justify-between mb-2">
              <div className="flex items-center justify-center w-[34px] h-[34px] bg-blue-500 rounded-full">
                <RiCalendarTodoFill className="w-[22px] h-[22px] " />
              </div>
              <p className="text-[22px] font-bold">
                {todayDatas[0]?.sizeNotCompleted ?? 0}
              </p>
            </div>
            <p className="opacity-30">Aujourd'hui</p>
          </div>
          <div
            onClick={async () => {
              setShowIndex((x) => (x = 2));
              setShowToday((x) => (x = false));
              setShowWeek((x) => (x = true));
              let date_today = new Date();

              let first_day_of_the_week = new Date(
                date_today.setDate(
                  date_today.getDate() - date_today.getDay() + 1
                )
              );

              let last_day_of_the_week = new Date(
                date_today.setDate(
                  date_today.getDate() - date_today.getDay() + 6 + 1
                )
              );
              await fetchWeekAllDatas(
                first_day_of_the_week,
                last_day_of_the_week
              );
            }}
            className="bg-[#1d1d1d] hover:brightness-125 rounded-xl px-4 py-[10px] w-full  cursor-pointer"
          >
            <div className="flex justify-between mb-2">
              <div className="flex items-center justify-center w-[34px] h-[34px] bg-blue-500 rounded-full">
                <MdCalendarViewDay className="w-[22px] h-[22px] " />
              </div>
              <p className="text-[22px] font-bold">{WeekDatas[0]?.sizeNotCompleted ?? 0}</p>
            </div>
            <p className="opacity-30">Semaine</p>
          </div>
        </div>

        <div className="flex-col flex-1 px-4 mt-5 mb-4 overflow-y-scroll no-scrollbar ">
          {!isLoading &&
            planning.map((item) => <PlanningItem key={item.id} item={item} />)}

          {/*  {isLoading && [1,2,3,4,5,].map((item) => (
            <PlanningItemShimmer key={item}  />
          ))}  */}
        </div>
        {isLoading ? (
          <div
            onClick={() => {
              setIsNewListItem(true);
              setAddNewListModal(true);
            }}
            className="absolute flex gap-2 font-bold text-teal-500 cursor-default bottom-16 right-9 rounded-full h-[25px] w-[140px]  animate-pulse duration-100    bg-[#ffffff1f] "
          ></div>
        ) : (
          <div
            onClick={() => {
              setColorItemSelect((x) => (x = 0));
              setIsNewListItem(true);
              setAddNewListModal(true);
            }}
            className="absolute flex gap-2 font-bold text-teal-500 cursor-pointer bottom-16 right-6"
          >
            <p>Ajouter une liste </p>
            <IoMdAddCircle className="w-6 h-6 " />
          </div>
        )}
      </div>
    );
  }
  function ItemCardShimmer({
    item = null,
    handleClick = (e) => {},
    isPopup = false,
  }) {
    return (
      <div className="pt-1 overflow-hidden">
        <div
          onClick={handleClick}
          className={` cursor-pointer   relative flex flex-col animate-pulse duration-100    bg-[#ffffff1f]   px-6 pt-5 pb-5 ${
            isPopup
              ? " max-w-[420px]  min-w-[420px]  min-h-[420px]   rounded-md"
              : " w-[230px] h-[230px]"
          } `}
        >
          {!isPopup && (
            //060606
            <>
              <div className="absolute z-10 rotate-45 bg-[#060606] w-[40px] h-[40px] -top-5 -right-5 "></div>
              <div className="absolute z-40 rotate-30 bg-[#0606064b] w-[29px] h-[29px] top-0 right-0 "></div>
            </>
          )}
        </div>
      </div>
    );
  }
  function ItemCard({ item = null, handleClick = (e) => {}, isPopup = false }) {
    return (
      <div
        onClick={handleClick}
        className={` cursor-pointer   relative flex flex-col ${
          item?.color ?? currentplanningItem?.color
        } text-black px-6 pt-5 pb-5 ${
          isPopup
            ? " max-w-[420px]  min-w-[420px]  min-h-[420px]   rounded-md"
            : " w-[230px] h-[230px]"
        } `}
      >
        {!isPopup && (
          //060606
          <>
            {/*  <div className="absolute z-20 rotate-45 bg-[#5740ef] w-[20px] h-[20px] -top-[9px] right-[5px] "></div>
             <div className="absolute z-20 rotate-45 bg-[#ef5240] w-[20px] h-[20px] bottom-[198px] -right-[3px] top-[14px] "></div> */}
            <div className="absolute z-10 rotate-45 bg-[#060606] w-[40px] h-[40px] -top-5 -right-5 "></div>
            <div className="absolute z-40 rotate-30 bg-[#0606064b] w-[29px] h-[29px] top-0 right-0 "></div>
          </>
        )}
        <p className="font-bold  line-clamp-2 text-[18px] leading-5 mb-1">
          {item?.name ?? currentplanningItem?.name}
        </p>
        <p className="flex-1 pt-2  mb-2  overflow-hidden text-[13.5px] leading-4 font-normal overscroll-y-scroll ">
          {item?.content ?? currentplanningItem?.content}
        </p>
        <div className="flex items-end justify-between">
          <div className="flex flex-col leading-4 ">
            {isPopup ? (
              <>
                <p className="text-[15px] font-normal">
                  {currentplanningItem?.date?.toString().substr(11, 5)}
                </p>
                <p className="text-[15px] font-normal">
                  {" "}
                  {daysFr(currentplanningItem?.date)}
                </p>
              </>
            ) : (
              <>
                <p className="text-[15px] font-normal">
                  {item?.date?.toString().substr(11, 5)}
                </p>
                <p className="text-[15px] font-normal"> {daysFr(item?.date)}</p>
              </>
            )}
          </div>
          <div className="flex gap-1 ">
            {!isPopup && (
              <div
                onClick={async (e) => {
                  e.stopPropagation();

                  if (!isPopup) {
                    await togglePlanningItem(
                      item.id,
                      item.isCompleted == true ? false : true
                    );

                 if (showToday) {
                  
                      await updatePlanningItem(
                        currentplanningItem?.id,
                        currentplanningItem
                      );
                      await fetchTodayAllDatas();
                       setAddNewItem((x) => (x = false));
                       (async () => {
                        const datasToday = await todayAllPlanningItem();
                        setTodayDatas((x) => (x = datasToday));

                        let date_today = new Date();

                        let first_day_of_the_week = new Date(
                          date_today.setDate(date_today.getDate() - date_today.getDay() + 1)
                        );
                  
                        let last_day_of_the_week = new Date(
                          date_today.setDate(date_today.getDate() - date_today.getDay() + 6 + 1)
                        );
                  
                        const datasWeek = await fetchAllWeekPlanningItem(
                          first_day_of_the_week,
                          last_day_of_the_week
                        );
                  
                        setWeekDatas((x) => (x = datasWeek));
                      })();
                     
                      return;
                      
                    }  
                    setIsLoadingItem((x) => (x = true));
                    await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );

                    setAddNewItem(false);
                    setIsLoadingItem((x) => (x = false));
                  } else {
                    await togglePlanningItem(
                      currentplanningItem.id,
                      currentplanningItem.isCompleted == true ? false : true
                    );

                    
                    if (showToday) {
                      await updatePlanningItem(
                        currentplanningItem?.id,
                        currentplanningItem
                      );
                      await fetchTodayAllDatas();
                      setAddNewItem((x) => (x = false));
                      setIsLoading((x) => (x = false));
                      return;
                    }
                    setIsLoadingItem((x) => (x = true));
                    await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );

                    setAddNewItem(false);
                    setIsLoadingItem((x) => (x = false));
                  }
                }}
                className={`flex items-center justify-center rounded-full cursor-pointer w-9 h-9 ${
                  item?.isCompleted == true
                    ? getIconColor(item?.color).toString()
                    : "bg-[#00000028]"
                }  `}
              >
                {item?.isCompleted == true ? (
                  <BiCheckDouble className="w-6 h-6 text-white" />
                ) : (
                  <BsCheck className="w-6 h-6 text-white" />
                )}
              </div>
            )}

            {isPopup && (
              <div
                onClick={async (e) => {
                  e.stopPropagation();

                  await togglePlanningItem(
                    currentplanningItem.id,
                    currentplanningItem.isCompleted == true ? false : true
                  );

                  if (showToday) {
                    await updatePlanningItem(
                      currentplanningItem?.id,
                      currentplanningItem
                    );
                    await fetchTodayAllDatas();
                    setAddNewItem((x) => (x = false));
                    setIsLoading((x) => (x = false));
                    currentplanningItem.isCompleted =
                      !currentplanningItem.isCompleted;
                    setCurrentPlanningItem(currentplanningItem);
                    return;
                  }
                  setIsLoadingItem((x) => (x = true));
                  await updatePlanningItem(
                    currentplanningItem?.id,
                    currentplanningItem
                  );

                  setAddNewItem(false);
                  setIsLoadingItem((x) => (x = false));
                  currentplanningItem.isCompleted =
                    !currentplanningItem.isCompleted;
                  setCurrentPlanningItem(currentplanningItem);
                  //  setShowItmeTodo((x) => (x = false));
                }}
                className={`flex items-center justify-center rounded-full cursor-pointer w-9 h-9 ${
                  currentplanningItem?.isCompleted == true
                    ? "bg-gray-500"
                    : "bg-[#00000028]"
                }  `}
              >
                {" "}
                <BsCheck className="w-6 h-6 text-white" />
              </div>
            )}
            {item?.isCompleted == false && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isPopup) {
                    setCurrentPlanningItem((x) => (x = item));
                  }
                  setTime(
                    (x) => (x = item?.date?.toString().substring(11, 16))
                  );
                  setAddNewItem((x) => (x = true));
                }}
                className="flex items-center justify-center bg-black rounded-full cursor-pointer w-9 h-9"
              >
                {" "}
                <HiPencil className="w-[18px] h-[18px] text-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  function PlanningItemShimmer() {
    return (
      <div className="relative flex items-center border-b cursor-pointer border-white/10">
        <p className="flex-1 py-3 pl-0 leading-10 line-clamp-1">
          <div className="text-[#9a9768] text-[18px] font-bold  rounded-full h-[40px] max-w-[200px]  animate-pulse duration-100     py-[8px]  ">
            <h2 className="text-[#9a9768] text-[18px] font-bold h-full  rounded-full w-[220px]  animate-pulse duration-100    bg-[#ffffff1f] "></h2>
          </div>
        </p>
        <div className="rounded-full p-1  animate-pulse duration-100    bg-[#ffffff1f]">
          <div className="w-5 h-5 opacity-60 hover:opacity-100"></div>
        </div>
      </div>
    );
  }

  function PlanningItem({ item }) {
    return (
      <div className="relative hover:bg-[#ffffff0a]  flex items-center border-b cursor-pointer border-white/10">
        <div
          onClick={() => {
            setShowIndex((x) => (x = 0));
            setDoneTodo((x) => (x = false));
            setSearchValue((x) => (x = ""));
            setShowToday((x) => (x = false));
            setShowWeek((x) => (x = false));
            setIsLoadingItem((x) => (x = false));
            setCurrentPlanning((x) => (x = item));
            setIsLoadingItem((x) => (x = true));
          }}
          className={`flex items-center justify-center w-8 h-8  bg-${item.color} rounded-full`}
        >
          <IoListSharp className="w-6 h-6 " />
        </div>
        <p
          onClick={() => {
            setShowIndex((x) => (x = 0));
            setDoneTodo((x) => (x = false));
            setSearchValue((x) => (x = ""));
            setShowToday((x) => (x = false));
            setShowWeek((x) => (x = false));
            setIsLoadingItem((x) => (x = false));
            setCurrentPlanning((x) => (x = item));
            setIsLoadingItem((x) => (x = true));
          }}
          className="flex-1 py-3 pl-4 leading-10 line-clamp-1"
        >
          {item.name}
        </p>
        <DropdownPlanningItem className="">
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={(e) => {
                  e.stopPropagation();

                  setColorItemSelect(
                    (x) => (x = getIconColorIndex(item.color))
                  );

                  setCurrentPlanningModal((x) => (x = item));
                  setListName((x) => (x = item.name));
                  setIsNewListItem(false);
                  setAddNewListModal(true);
                }}
                className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                  active
                    ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                    : " "
                }`}
              >
                <RiFileEditLine className="min-w-10 min-h-10 " />
                Modifier
              </div>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                onClick={async () => {
                  modal.onSubmit = (
                    <ButtonComponent
                      handleClick={async () => {
                        setIsLoading(true);
                        setIsLoadingItem(false);
                        const data = await deletePlanning(item.id);

                        if (data) {
                          modal.onClose();
                          setIsLoading(true);
                          setIsLoadingItem(true);
                          setCurrentPlanning(
                            (x) =>
                              (x =
                                currentplanning?.id == item.id
                                  ? null
                                  : currentplanning)
                          );
                        }
                      }}
                      label={"Supprimer"}
                      className="  mt-6 mb-4 shadow-xl shadow-black/20 bg-[#9a9768] border-none   "
                    />
                  );
                  modal.onOpen();
                  modal.setTitle("Êtes-vous sûr ?");
                  modal.setMessage(
                    "Voulez-vous vraiment supprimer cette liste ?"
                  );
                }}
                className={`  px-2  py-2 flex  justify-start pl-4  items-center gap-2   text-[17px] cursor-pointer mx-2 ${
                  active
                    ? " bg-gradient-to-r from-[#44444419] via-[#444444] to-[#4444444a]"
                    : " "
                }`}
              >
                {/* icontrash */}
                <svg
                  width="16"
                  height="18"
                  viewBox="0 0 16 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.03423 6.26667C10.2349 6.26667 12.4355 6.26667 14.6362 6.26667C15.2964 6.26667 15.4944 6.48307 15.4431 7.1341C15.1405 11.0195 14.8391 14.9042 14.539 18.7884C14.4473 19.9593 14.3849 21.1321 14.3052 22.303C14.2854 22.7661 14.0847 23.203 13.7462 23.5197C13.4077 23.8364 12.9585 24.0076 12.4951 23.9966C9.52792 24.0009 6.5604 24.0009 3.59257 23.9966C2.53809 23.9966 1.80454 23.3383 1.71926 22.2746C1.60189 20.8029 1.52579 19.3276 1.41484 17.855C1.15381 14.3651 0.887291 10.8755 0.615265 7.38626C0.606096 7.27714 0.59876 7.16803 0.590508 7.05891C0.551079 6.49316 0.763809 6.26117 1.34423 6.26025C3.05585 6.26025 4.76472 6.26025 6.47084 6.26025H8.02964L8.03423 6.26667ZM8.38816 15.1005C8.38816 13.5142 8.38816 11.9279 8.38816 10.3406C8.38816 10.1004 8.32398 9.92985 8.06449 9.91701C7.80499 9.90417 7.6702 10.0674 7.65553 10.3232C7.64911 10.4461 7.65553 10.569 7.65553 10.69C7.65553 12.618 7.65553 14.5463 7.65553 16.475C7.65553 17.6101 7.64728 18.7453 7.66653 19.8805C7.68807 20.0456 7.77289 20.1958 7.9031 20.2995C7.96637 20.3509 8.19928 20.2995 8.25796 20.2262C8.34362 20.092 8.38676 19.9351 8.38175 19.7759C8.39 18.219 8.38725 16.6602 8.38816 15.1005ZM11.9991 10.5158C12.0247 10.2471 12.0431 9.95827 11.6809 9.92251C11.3829 9.89409 11.2958 10.1123 11.2756 10.3746C11.0311 13.5087 10.7866 16.6428 10.5421 19.7769C10.5201 20.0464 10.5421 20.305 10.8648 20.3316C11.1876 20.3582 11.2518 20.1051 11.2719 19.8365C11.5116 16.7317 11.7539 13.6257 11.9991 10.5185V10.5158ZM4.04829 10.601C4.22312 12.8628 4.39886 15.1246 4.57553 17.3864C4.63971 18.2043 4.71399 19.0213 4.77359 19.8392C4.79284 20.1143 4.84786 20.3518 5.18163 20.3252C5.51539 20.2986 5.5319 20.0391 5.50347 19.775C5.50347 19.7347 5.50347 19.6934 5.49614 19.6522C5.30663 17.2406 5.11713 14.8288 4.92763 12.4166C4.87628 11.7628 4.8231 11.1081 4.77175 10.4543C4.75066 10.1793 4.7149 9.89592 4.35546 9.92251C4.0217 9.94635 4.01253 10.2159 4.0382 10.4727C4.04462 10.5222 4.04554 10.5625 4.04829 10.6038V10.601Z"
                    fill="#EBEBEB"
                  />
                  <path
                    d="M11.2756 2.81731H15.2001C15.8511 2.81731 15.908 2.87416 15.9071 3.51235C15.9071 4.04601 15.8997 4.57875 15.9071 5.11149C15.9126 5.43792 15.7649 5.59472 15.4431 5.59747C15.3514 5.59747 15.2524 5.59747 15.157 5.59747H0.807814C0.187046 5.59747 0.130196 5.5397 0.127445 4.91618C0.127445 4.42471 0.121944 3.93322 0.127445 3.44175C0.127445 2.89708 0.211804 2.81731 0.740878 2.81731C1.9329 2.81731 3.11667 2.80539 4.30411 2.82465C4.65163 2.83106 4.80659 2.75404 4.76991 2.37534C4.74015 2.08958 4.75282 1.80098 4.80751 1.51892C4.89555 1.0932 5.12746 0.710773 5.46427 0.435915C5.80108 0.161057 6.22225 0.0105313 6.65697 0.00964012C7.55924 -0.0022801 8.46151 -0.00411398 9.36286 0.00964012C10.4559 0.0252281 11.2618 0.851391 11.2765 1.94989C11.2793 2.2213 11.2756 2.4918 11.2756 2.81731ZM6.01236 2.78613H10.0423C10.0423 2.51105 10.0487 2.25339 10.0423 1.99756C10.0276 1.49508 9.78741 1.25576 9.27759 1.24934C8.63573 1.24017 7.99387 1.26493 7.35201 1.23834C6.01787 1.18149 5.91425 1.47674 6.01236 2.78613Z"
                    fill="#EBEBEB"
                  />
                </svg>
                Supprimer
              </div>
            )}
          </Menu.Item>
        </DropdownPlanningItem>
      </div>
    );
  }
}

export default Planning;
