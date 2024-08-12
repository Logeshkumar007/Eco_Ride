// import Image from "next/image"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MapComponent from "../../oldComponents/BookRide/Map";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Map() {
  const profile = useSelector((state) => state.loginReducer);
  const rideId = useSelector((state) => state.selectedIdReducer);
  const [mapData, setmapData] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   console.log("MapData from useffect ", mapData);
  //   if (!mapData) {
  //     console.log(latitude + " " + longitude);
  //   }
  // }, [mapData]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/app/bookride/selectedValue/${rideId.idSelected}`
      )
      .then((response) => {
        {
          console.log("Rider details ", response.data);
          setmapData(response.data);
          setLatitude(response.data.leavingFromLatitude);
          setLongitude(response.data.leavingFromLongitude);
          setOpen(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    console.log("The ride details", mapData);
  }, []);

  useEffect(() => {
    console.log("the profile", profile);
  }, [profile]);
  useEffect(() => {
    console.log("the mapData", rideId);
  }, [rideId]);

  console.log("check", mapData);
  console.log("open", open);

  // sampleSubmit();
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
                <CardHeader className="pb-3">
                  <CardTitle>
                    {profile.firstName + " " + profile.lastName}
                  </CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Year of Studying : {profile.yearOfStudy}
                  </CardDescription>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Contact No:{profile.phoneNumber}
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button>Rate your experience</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription></CardDescription>
                  <CardTitle className="text-2xl">Eligable for Ride</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className=" text-muted-foreground text-green-800 font-bold text-2xl">
                    Verified
                  </div>
                </CardContent>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>Proximity to Driver</CardDescription>
                  <CardTitle className="text-xs">
                    Distance between driver and passanger should be displayed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Location</CardTitle>
                    <CardDescription>
                      Current location of an pilot approximately.
                    </CardDescription>
                    <div>
                      {open && (
                        <>
                          <MapComponent
                            latitude={latitude}
                            longitude={longitude}
                          />
                          <div className="mt-4">
                            <span className="text-gray-600 font-semibold">
                              Latitude:
                            </span>
                            {latitude && (
                              <span className="ml-2 text-blue-600 font-bold">
                                {latitude}
                              </span>
                            )}
                            <br />
                            <span className="text-gray-600 font-semibold">
                              Longitude:
                            </span>
                            {longitude && (
                              <span className="ml-2 text-blue-600 font-bold">
                                {longitude}
                              </span>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </CardHeader>
                </Card>
                <div></div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
              <CardHeader className="flex flex-row items-start bg-muted/50">
                {mapData ? (
                  <CardTitle className="group flex items-center gap-2 text-lg">
                    Date : {mapData.date}
                  </CardTitle>
                ) : (
                  <p>Loading...</p>
                )}
                <div className="ml-auto flex items-center gap-1">
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <Truck className="h-3.5 w-3.5" />
                    <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                      Track Order
                    </span>
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="icon" variant="outline" className="h-8 w-8">
                        <MoreVertical className="h-3.5 w-3.5" />
                        <span className="sr-only">More</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Export</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Trash</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                <div className="grid gap-3">
                  <div className="font-semibold"> Ride Details</div>
                  <ul className="grid gap-3">
                    <li className="flex  m-1 items-center justify-between">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Leaving From:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.leaving}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>

                    <li className="flex items-center m-1 justify-between">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Going To:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.going}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>

                    <li className="flex items-center m-1 justify-between ">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Available Seats:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.availableSeats}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>
                    <li className="flex items-center m-1 justify-between">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Car Name:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.carName}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>
                    <li className="flex items-center m-1 justify-between">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Car Number:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.carNumber}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>
                    <li className="flex items-center m-1 justify-between font-semibold">
                      {mapData ? (
                        <div className="flex flex-col sm:flex-row justify-aro w-full">
                          <span className="text-gray-600 font-semibold">
                            Excepted Price:
                          </span>
                          <span className="ml-2 text-blue-600 font-bold">
                            {mapData.price}
                          </span>
                        </div>
                      ) : (
                        <p className="text-gray-500">Loading....</p>
                      )}
                    </li>
                  </ul>
                </div>
                <Separator className="my-4" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="grid gap-3">
                    <div className="font-semibold">Pilot Details:</div>
                    <address className="grid  not-italic text-muted-foreground p-5 m">
                      <div>
                        {mapData ? (
                          <div className="flex flex-col sm:flex-row justify-aro w-full">
                            <span className="text-gray-600 font-semibold">
                              Name:
                            </span>
                            <span className="ml-2 text-blue-600 font-bold">
                              {mapData.name}
                            </span>
                          </div>
                        ) : (
                          <p className="text-gray-500">Loading....</p>
                        )}
                      </div>
                      <div className="m-1">
                        {" "}
                        {mapData ? (
                          <div className="flex flex-col sm:flex-row justify-aro w-full">
                            <span className="text-gray-600 font-semibold">
                              Email:
                            </span>
                            <span className="ml-2 text-blue-600 font-bold">
                              {mapData.email}
                            </span>
                          </div>
                        ) : (
                          <p className="text-gray-500">Loading....</p>
                        )}
                      </div>
                      <div className="m-1">
                        {mapData ? (
                          <div className="flex flex-col sm:flex-row justify-aro w-full">
                            <span className="text-gray-600 font-semibold">
                              Phone Number:
                            </span>
                            <span className="ml-2 text-blue-600 font-bold">
                              {mapData.phone}
                            </span>
                          </div>
                        ) : (
                          <p className="text-gray-500">Loading....</p>
                        )}
                      </div>
                    </address>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
