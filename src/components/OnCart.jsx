import { useState } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import QRcode from "../assets/mockup_QRcode.svg";
import CancelPayment from "../assets/baby.png"

import { useToast } from "@/lib/utils/ui/use-toast";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/lib/utils/ui/menubar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/utils/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/lib/utils/ui/dialog";

function OnCart() {
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(0);
  const { cart, setCart } = useGlobalContext();
  const totalQuantity = cart.reduce(
    (accumulator, item) => accumulator + item.quantity,
    0
  );
  const totalAmount = cart.reduce(
    (accumulator, item) => accumulator + item.quantity * item.price,
    0
  );

  let discount = 0;
  if (totalQuantity > 5) {
    discount = 0.2;
  } else if (totalQuantity > 3) {
    discount = 0.1;
  }

  function saveToLocal(data) {
    const cartJSON = JSON.stringify(data);
    localStorage.setItem("cart", cartJSON);
  }
  function countDown() {
    let timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 1) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer);

          return 0;
        }
      });
    }, 1000);
   

    return () => {
      clearInterval(timer); // Clear interval in the cleanup function
    };
  }

  return (
    <div className="container">
      <Menubar className=" border-none text-white w-[50px] h-[50px] my-[5px] mx-[700px] flex justify-center items-center">
        <MenubarMenu>
          <MenubarTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-bag-fill"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5z" />
            </svg>
          </MenubarTrigger>
          <MenubarContent className="w-[600px] h-fit bg-white">
            <MenubarItem className="h-[500px] w-full flex flex-col flex-nowrap">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead></TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>quantity</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart
                    ? cart.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="w-[100px]  m-0">
                            <img
                              className="h-[80px] w-fit "
                              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            />
                          </TableCell>
                          <TableCell className={"w-[120px] text-[12px]"}>
                            {item.title}
                          </TableCell>
                          <TableCell className={"w-[140px] text-[12px] "}>
                            <Button
                              className=" w-[5px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.quantity >= 1) {
                                  const updatedCart = [...cart];
                                  updatedCart[index].quantity -= 1;
                                  setCart(updatedCart);
                                  saveToLocal(cart);
                                }
                              }}
                            >
                              -
                            </Button>
                            {item.quantity}
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedCart = [...cart];
                                updatedCart[index].quantity += 1;
                                setCart(updatedCart);
                                saveToLocal(cart);
                              }}
                            >
                              +
                            </Button>
                          </TableCell>
                          <TableCell className={"w-[120px] text-[12px]"}>
                            <Input
                              id="name"
                              value={Intl.NumberFormat().format(item.price)}
                              onChange={(e) => {
                                const updatedCart = [...cart];
                                updatedCart[index].price = e.target.value;
                                setCart(updatedCart);
                                saveToLocal(updatedCart);
                                e.stopPropagation();
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className=" w-full h-[30px] text-[12px] rounded-[8px] "
                            />
                          </TableCell>
                          <TableCell className={"w-[100px] text-[12px]"}>
                            {Intl.NumberFormat().format(
                              item.quantity * item.price
                            )}
                          </TableCell>
                          <TableCell className={"w-[10px] text-[12px] "}>
                            <Button
                              className="p-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                const updatedCart = [...cart];
                                updatedCart.splice(index, 1);
                                setCart(updatedCart);
                                saveToLocal(updatedCart);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash-fill"
                                viewBox="0 0 16 16"
                              >
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                              </svg>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </MenubarItem>
            <MenubarSeparator className="underline underline-offset-6 w-full my-[20px] bg-[#0000004a]" />
            <MenubarItem>
              <Table>
                <TableBody>
                  <TableRow className="text-[12px] font-semibold">
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="w-[250px] pl-[150px]">Total</TableCell>
                    <TableCell>{totalQuantity}</TableCell>
                    <TableCell>{Intl.NumberFormat().format(totalAmount)}</TableCell>
                  </TableRow>
                  <TableRow className="text-[12px] font-semibold">
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="w-[250px] pl-[150px]">Discount</TableCell>
                    <TableCell>{discount * 100} %</TableCell>
                    <TableCell>{Intl.NumberFormat().format(totalAmount * discount)}</TableCell>
                  </TableRow>
                  <TableRow className="text-[12px] font-semibold">
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="w-[250px] pl-[150px]">Net price</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{Intl.NumberFormat().format(totalAmount * (1 - discount))}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="bg-[#EA3E4E] text-white rounded-full ml-[75%] mb-[15px] w-[100px] hover:bg-[#ea3e4fd2]"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountdown(60);
                      countDown();
                    }}
                  >
                    Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] h-[800px]">
                  <DialogHeader>
                    <DialogTitle>Payment</DialogTitle>
                    {countdown != 0 ? (
                      <DialogDescription>
                        Please scan the QR code within {countdown} sec
                        <img src={QRcode} alt="QRcode" />
                      </DialogDescription>
                    ) : (
                        <DialogDescription className="flex flex-col items-center pt-[20px]">
                          <img className="h-[360px]" src={CancelPayment} alt="cancel payment icon" />
                        Time Out !! Please try again next time
                      </DialogDescription>
                    )}
                  </DialogHeader>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead></TableHead>

                        <TableHead>quantity</TableHead>

                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell>{totalQuantity}</TableCell>
                        <TableCell>{totalAmount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Discount</TableCell>
                        <TableCell>{discount * 10} %</TableCell>
                        <TableCell>{totalAmount * discount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Net price</TableCell>
                        <TableCell></TableCell>
                        <TableCell>{totalAmount * (1 - discount)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <DialogFooter>
                    <Button
                      disabled={countdown === 0}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full w-[80px]"
                      onClick={() => {
                        localStorage.removeItem("cart");
                        setCart([]);

                        toast({
                          description: "Your payment was successful",
                        });
                      }}
                    >
                      Done
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default OnCart;
