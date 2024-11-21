"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PlusCircle, Package, MapPin, Edit, Trash, LogOut } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// Types
interface IAddress {
    _id?: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    address_type: "home" | "work" | "other";
    user_id?: string;
}

interface IOrder {
    id: string;
    date: string;
    status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
    total: number;
    items: {
        name: string;
        size: string;
        color: string;
        quantity: number;
        price: number;
    }[];
}

// Dummy Data
const DUMMY_ADDRESSES: IAddress[] = [
    {
        _id: "1",
        address_line1: "123 Main Street",
        address_line2: "Apartment 4B",
        city: "Mumbai",
        state: "Maharashtra",
        postal_code: "400001",
        country: "INDIA",
        address_type: "home"
    },
    {
        _id: "2",
        address_line1: "456 Work Plaza",
        address_line2: "Floor 3",
        city: "Mumbai",
        state: "Maharashtra",
        postal_code: "400002",
        country: "INDIA",
        address_type: "work"
    }
];

const DUMMY_ORDERS: IOrder[] = [
    {
        id: "ORD123456",
        date: "2024-03-15",
        status: "Delivered",
        total: 1999,
        items: [
            {
                name: "Premium Cotton Hoodie",
                size: "L",
                color: "Black",
                quantity: 1,
                price: 1999
            }
        ]
    }
];

export default function UserProfile() {
    const router = useRouter();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState<"orders" | "addresses">("orders");
    const [addresses, setAddresses] = useState<IAddress[]>([]);
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

    const [addressForm, setAddressForm] = useState<IAddress>({
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "INDIA",
        address_type: "home"
    });

    useEffect(() => {
        const userId = sessionStorage.getItem("userID");
        if (!userId) {
            router.push("/auth/login");
            return;
        }

        fetchAddresses();
        fetchOrders();
    }, []);

    const fetchAddresses = async () => {
        try {
            const userId = sessionStorage.getItem("userID");
            const response = await axios.get(`/api/addresses/${userId}`);
            setAddresses(response.data);
        } catch (error) {
            console.log("Using dummy address data due to API error:", error);
            setAddresses(DUMMY_ADDRESSES);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        try {
            const userId = sessionStorage.getItem("userID");
            const response = await axios.get(`/api/orders/${userId}`);
            setOrders(response.data);
        } catch (error) {
            console.log("Using dummy order data due to API error:", error);
            setOrders(DUMMY_ORDERS);
        }
    };

    const handleAddAddress = async () => {
        try {
            const userId = sessionStorage.getItem("userID");
            const addressData = { ...addressForm, user_id: userId };

            await axios.post("/api/address", addressData);

            toast({
                title: "Success",
                description: "Address added successfully"
            });

            setIsAddressModalOpen(false);
            fetchAddresses();
        } catch (error) {
            console.error("Error adding address:", error);
            toast({
                title: "Error",
                description: "Failed to add address. Please try again.",
                variant: "destructive"
            });
        }
    };

    const handleDeleteAddress = async (addressId: string) => {
        try {
            await axios.delete(`/api/address/${addressId}`);
            toast({
                title: "Success",
                description: "Address deleted successfully"
            });
            fetchAddresses();
        } catch (error) {
            console.error("Error deleting address:", error);
            toast({
                title: "Error",
                description: "Failed to delete address",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="min-h-screen bg-background pt-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Profile Header */}
                <div className="bg-secondaryBackground rounded-xl p-6 md:p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative w-24 h-24 rounded-full overflow-hidden">
                            <Image
                                src="/profile.png"
                                alt="Profile"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl md:text-3xl font-heading1 text-white">
                                {sessionStorage.getItem("username") || "User"}
                            </h1>
                            <p className="text-white/70">
                                {sessionStorage.getItem("email") || "user@example.com"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex border-b border-white/10 mb-8">
                    <button
                        onClick={() => setActiveTab("orders")}
                        className={`py-4 px-6 font-heading1 text-lg ${activeTab === "orders"
                                ? "text-accent border-b-2 border-accent"
                                : "text-white/70"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <Package size={20} />
                            Orders
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab("addresses")}
                        className={`py-4 px-6 font-heading1 text-lg ${activeTab === "addresses"
                                ? "text-accent border-b-2 border-accent"
                                : "text-white/70"
                            }`}
                    >
                        <span className="flex items-center gap-2">
                            <MapPin size={20} />
                            Addresses
                        </span>
                    </button>
                </div>

                {/* Content Area */}
                {activeTab === "orders" && (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-secondaryBackground rounded-xl p-6"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h3 className="text-lg font-heading1 text-white">
                                            Order #{order.id}
                                        </h3>
                                        <p className="text-white/70">Placed on {order.date}</p>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-heading1 
                    ${order.status === "Delivered"
                                            ? "bg-green-500/10 text-green-500"
                                            : "bg-yellow-500/10 text-yellow-500"}`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center py-4 border-t border-white/10"
                                    >
                                        <div>
                                            <p className="text-white font-heading1">{item.name}</p>
                                            <p className="text-white/70">
                                                Size: {item.size}, Color: {item.color}, Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <p className="text-white font-heading1">₹{item.price}</p>
                                    </div>
                                ))}
                                <div className="border-t border-white/10 pt-4 mt-4">
                                    <div className="flex justify-between">
                                        <span className="text-white font-heading1">Total</span>
                                        <span className="text-white font-heading1">₹{order.total}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {orders.length === 0 && (
                            <div className="text-center py-12 text-white/70">
                                No orders yet
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "addresses" && (
                    <div className="space-y-6">
                        <Button
                            onClick={() => setIsAddressModalOpen(true)}
                            className="w-full bg-accent hover:bg-accent/90 rounded-full font-heading1"
                        >
                            <PlusCircle className="mr-2" />
                            Add New Address
                        </Button>

                        {addresses.map((address) => (
                            <div
                                key={address._id}
                                className="bg-secondaryBackground rounded-xl p-6"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-heading1">
                                        {address.address_type.toUpperCase()}
                                    </span>
                                    <div className="space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-white/70 hover:text-white"
                                            onClick={() => {
                                                setAddressForm(address);
                                                setIsAddressModalOpen(true);
                                            }}
                                        >
                                            <Edit size={16} className="mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-white/70 hover:text-white"
                                            onClick={() => address._id && handleDeleteAddress(address._id)}
                                        >
                                            <Trash size={16} className="mr-1" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                                <div className="text-white/70 space-y-1">
                                    <p>{address.address_line1}</p>
                                    {address.address_line2 && <p>{address.address_line2}</p>}
                                    <p>{address.city}, {address.state}</p>
                                    <p>{address.postal_code}</p>
                                    <p>{address.country}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Address Modal */}
                <Dialog open={isAddressModalOpen} onOpenChange={setIsAddressModalOpen}>
                    <DialogContent className="bg-secondaryBackground text-white">
                        <DialogHeader>
                            <DialogTitle className="font-heading1">
                                {addressForm._id ? "Edit Address" : "Add New Address"}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-white/70">Address Type</label>
                                <div className="flex gap-4">
                                    {["home", "work", "other"].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setAddressForm({
                                                ...addressForm,
                                                address_type: type as IAddress["address_type"]
                                            })}
                                            className={`px-4 py-2 rounded-full text-sm font-heading1 
                        ${addressForm.address_type === type
                                                    ? "bg-accent text-white"
                                                    : "bg-white/10 text-white/70 hover:bg-white/20"}`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Input
                                placeholder="Address Line 1"
                                className="bg-background"
                                value={addressForm.address_line1}
                                onChange={(e) => setAddressForm({
                                    ...addressForm,
                                    address_line1: e.target.value
                                })}
                            />

                            <Input
                                placeholder="Address Line 2 (Optional)"
                                className="bg-background"
                                value={addressForm.address_line2}
                                onChange={(e) => setAddressForm({
                                    ...addressForm,
                                    address_line2: e.target.value
                                })}
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <Input
                                    placeholder="City"
                                    className="bg-background"
                                    value={addressForm.city}
                                    onChange={(e) => setAddressForm({
                                        ...addressForm,
                                        city: e.target.value
                                    })}
                                />
                                <Input
                                    placeholder="State"
                                    className="bg-background"
                                    value={addressForm.state}
                                    onChange={(e) => setAddressForm({
                                        ...addressForm,
                                        state: e.target.value
                                    })}
                                />
                            </div>

                            <Input
                                placeholder="PIN Code"
                                className="bg-background"
                                value={addressForm.postal_code}
                                onChange={(e) => setAddressForm({
                                    ...addressForm,
                                    postal_code: e.target.value
                                })}
                            />
                        </div>

                        <div className="flex gap-4">
                            <Button
                                onClick={handleAddAddress}
                                className="flex-1 bg-accent hover:bg-accent/90 rounded-full font-heading1"
                            >
                                Save Address
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddressModalOpen(false)}
                                className="flex-1 text-white hover:text-accent rounded-full font-heading1"
                            >
                                Cancel
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Logout Button */}
                <Button
                    variant="outline"
                    className="w-full mt-8 text-white hover:text-accent rounded-full font-heading1"
                    onClick={() => {
                        sessionStorage.clear();
                        router.push('/auth/login');
                    }}
                >
                    <LogOut className="mr-2" />
                    Logout
                </Button>
            </div>
        </div>
    );
}