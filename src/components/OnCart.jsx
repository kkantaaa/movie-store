import { useState, useEffect } from "react";
import { useGlobalContext } from "../Contexts/GlobalContext";
import QRcode from "../assets/mockup_QRcode.svg";

import { useToast } from "@/lib/utils/ui/use-toast";
import { Button } from "@/lib/utils/ui/button";
import { Input } from "@/lib/utils/ui/input";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/lib/utils/ui/menubar";
import {
  Table,
  TableBody,
  TableCaption,
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
    <div className="">
      <Menubar className=" border-none text-white w-[50px] h-[50px] my-[5px] mx-[300px] flex justify-center items-center">
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
              <Table>
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
                          <TableCell className="font-medium">
                            <img
                              className="h-[80px]"
                              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            />
                          </TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>
                            <Button
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
                          <TableCell>
                            <Input
                              id="name"
                              value={item.price}
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              onChange={(e) => {
                                const updatedCart = [...cart];
                                updatedCart[index].price = e.target.value;
                                setCart(updatedCart);
                                saveToLocal(updatedCart);
                              }}
                              className="col-span-3"
                            />
                          </TableCell>
                          <TableCell>{item.quantity * item.price}</TableCell>
                          <TableCell>
                            <Button
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
            <MenubarSeparator />
            <MenubarItem>
              <Table>
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
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCountdown(60);
                      countDown();
                    }}
                  >
                    Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Payment</DialogTitle>
                    {countdown != 0 ? (
                      <DialogDescription>
                        Please scan the QR code within {countdown}
                        <img src={QRcode} alt="QRcode" />
                      </DialogDescription>
                    ) : (
                      <DialogDescription>
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
                      onClick={() => {
                          localStorage.removeItem("cart");
                          setCart([])

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
