import React, { useEffect } from "react";

function IntouchApi(props) {
  const html = `<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <meta charset="utf-8" />
        <title>pageWebTest</title>

          <script src=https://touchpay.gutouch.net/touchpayv2/script/touchpaynr/prod_touchpay-0.0.1.js  type="text/javascript"></script>
        <script type="text/javascript">
            function calltouchpay(){
                sendPaymentInfos(new Date().getTime(),
                                 'MEEEN6554','FCEmWBxHyM1FaChW92QDRocUGdr9lwwG1ulrpXUg4BP5Hsml0J',
                                 'meeentreprise.com',  'success_url',
                                 'google.com', 5000,
                                 'Abidjan', 'test1','tes2', 'test2',  'test3');
            }

            function calltouchpayCI(){
                sendPaymentInfos(new Date().getTime(),
                                 'MEECI10889','l72Nf0TzwuW5UVGVNrjNmyL4ugo2muQkL1Gw7E1GuKU14ywq2U',
                                 'meeentrepriseci.com',  'https://www.google.fr/',
                                 'https://www.msn.com/fr-fr', 5000,
                                 'Abidjan', 'test1','tes2', 'test2',  'test3');
            }
            function calltouchpayBF(){
              sendPaymentInfos(new Date().getTime(),
                               'MEEBF2961','hQIlBER4kNvIh264Kor1WczeOE0qW5Z1g0YjRqjhTBuG2uaiKl',
                               'meeentreprisebf.com',  'https://www.google.fr/',
                               'https://www.msn.com/fr-fr', 100,
                               'Abidjan', 'test1','tes2', 'test2',  'test3');
          }

          function calltouchpayGN(){
            sendPaymentInfos(new Date().getTime(),
                             'MEEGN4700','NMAinYClLVmWEaMtVsrCPZxYj8yKiz4vTrTbTrdeeXq8GYmA6r',
                             'meeentreprisegn.com',  'https://www.google.fr/',
                             'https://www.msn.com/fr-fr', 100,
                             'Abidjan', 'test1','tes2', 'test2',  'test3');
        }
        </script>

    </head>



    <body>

      <div class="items-center h-screen bg-black ">
        
      <div class="flex items-center justify-center gap-10 p-10 max-w-[500px] flex-wrap mx-auto ">
        <div onclick='calltouchpay()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg" alt="" srcset="">
        </div>
        <div onclick='calltouchpayCI()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEX3fwD///8AnmBWUWjSAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII=" alt="" srcset="">
        </div>
        <div onclick='calltouchpay()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACFCAMAAAApQEceAAAAh1BMVEUAhT/jGyP970IAgj//9EJ5qkD+9kPrdy7iCiL/8kKexEEJij8AgD/47UIAfj8Aiz/e40JPo0CuyEHs6EJ0r0C7zUHk4kIbkj+20kFeq0Clx0EdjT/Y30Ly60Khv0Hn6EJssECPuUAjmj+DuEBjqEBYokCCskA1l0DP2kI/oUB6uEGLv0DD1kFSU4jTAAACVElEQVR4nO3ZXZOaMBQGYJakttEAAQT8QLcou7Bd///vW2CgFQg4HW9O2PeMFxoOMzyTk5BEy3o22A9uPxmrn79eno2nHYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAmABRahkQEQRiEZBwuw2XABFlkpTzXWIGxI6kjJbQI+GWsQe1ZQYkTiwriRcAiViVM19bRkCcfQ357ZgP2dRJnvEQsXPrJHc3NwGbAOE+a5L8uSQTIIK1WYb3SFtZD2qLIkRwcR+rfdcj+1XvAhfEIYds3Ytjl3bst2cH4pD0wjb38S+v18ySlDhEhBljD29xrzH10qpilzyQMG+wYiEK4SqfvyNX3AiILU7ZcbJT2DE7DWdiqpD69fE2IZG+5oVCF2IL9b7RUNjmPdVkE4ZU5RUUcpSaHEZlRR1SRTka83mpzyQOEZHXz/SiifUWcYh9HtSWPE8kEocofzDcmT9xdkobIkpvmOpNHNTRhjjr0awlz/qtO21I2FUWaz7NN19/UEcbknbXiyAoutGSalNpQ9rKYn718GnbO3JtHsT5aJ7d/dMMC+fTrX+yD+0gIQ2J61MH5t3ai/zW7FJc7SEwZQi/ymqJuFd/51sR5tUyUn6attbiF2YV6/slonAORbVs1CVThry61ttt2HjLLffVLEhVWZkaVZFQmbyatR/hl0i38xCn6KJpJgxxJv+iijUTMGHI/wUggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAsg3gHwBVOOG05v6eK8AAAAASUVORK5CYII=" alt="" srcset="">
        </div>
      

        <div onclick='calltouchpayBF()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAMAAAAFBRFXAAAAk1BMVEUAnknvKy380RZSjkXURTPzJizvIC791hTyXigAnUr/0hT81BX/1BAAmkzyZCgAm0vwQCvtAC/4px96rj30eyXwNCzxTSr7xxjzbif92xP3oCD8zBf+3xLxWin6vhr1hiP5sB32kiL1iyLUWDHdrSWNszjtzRxUp0LVxiUnnkmiujOWtTbiyiCvvDAzoka6vi7PNzS7UcqwAAACzklEQVR4nO3X23qaQBSGYUJbcDaASIyixpiNghuw9391nYq7RmI8mVl9lv97lnDAfM8sBvQe7oxHvQDXEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgh3pdoluTBQcPD4GNHcmCu73en2aO9MEB0+DwRPNFhMFD/N8eE/BD6M8H9HcmSa4P1ZqTPMQkwQH8cT3JzHJTJMEp6PQ98NRSnFvmmDTa4rvJjjoTP4G08w0RXDaa3a4R7HFJDvs793JDgdx2PSGFDNNEJz2VBOsKGaaYqQHh+ABwc3dBwfD8eEZHhN8T9sODi4cJ3o305fXLS/IdvBz3Pkknp6Cp5dXny0vyHbwyzgPPzn2muLP13L/xfKCbAennVl+Vnidymex7YPb+qEVdF9VeFtvqF671k8xB6e0OZZvKg7NoW3/1HbxWgr6sxuKw2nfxUvKzXs4fVPfPMhKvbn57PJ+OZHGU3mtV047qZuVeD8def9QXyZL9fH+29E6vB/OzBe6vVcv5u5W4bkjirK1WJeFcLgMh8Ry1VKsV0umvaY42lw8x3ITUS/Lppb3cUi9JouSddtIrxPqdVnTMtGsZ1rUrZ9bquZ6aEXr1k8Puea6xecTrU9PM9uZFsXiECz9qvKPfyyYfnhEq9OeZlGUnfZ7xXOLRdkUSlnWpjCqS7n/R8lyh0XRbKleVMkuUCRV83NCbljOdLRuTqsyS/Z5Isn2PydYntPLrYmTenv+1hX1Vptt11u6ZVmzm2ipM/HP9AqRmWKWM53MtXl8vYvZjTzzIOs5v+/pZaXVNmrZSBFtla6W7ldkl/nqMC/f9mvmlczv20NkZfHl2CZFmXEL9or6ymOa1LW7lTgirm7h9asAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAf+QN12HfyehjrygAAAABJRU5ErkJggg==" alt="" srcset="">
        </div>
        <div onclick='calltouchpay()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/langfr-225px-Flag_of_Cameroon.svg.png" alt="" srcset="">
        </div>
        
        <div onclick='calltouchpayGN()' class="h-20 border-2 cursor-pointer w-30 ">
          <img class="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEXOESb80RYAlGAUMqWHAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII=" alt="" srcset="">
        </div>
      </div>

      
      </div>

        
      
    </body>
</html>

<form method="post" action="" target="TouchPay">
`;

  return (
    <html key="1">
      <head>
        <script src="https://cdn.tailwindcss.com" />
        <meta charSet="utf-8" />
        <title>pageWebTest</title>
        <script
          src="https://touchpay.gutouch.net/touchpayv2/script/touchpaynr/prod_touchpay-0.0.1.js"
          type="text/javascript"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "            function calltouchpay(){                sendPaymentInfos(new Date().getTime(),                                 'MEEEN6554','FCEmWBxHyM1FaChW92QDRocUGdr9lwwG1ulrpXUg4BP5Hsml0J',                                 'meeentreprise.com',  'success_url',                                 'google.com', 5000,                                 'Abidjan', 'test1','tes2', 'test2',  'test3');            }            function calltouchpayCI(){                sendPaymentInfos(new Date().getTime(),                                 'MEECI10889','l72Nf0TzwuW5UVGVNrjNmyL4ugo2muQkL1Gw7E1GuKU14ywq2U',                                 'meeentrepriseci.com',  'https://www.google.fr/',                                 'https://www.msn.com/fr-fr', 5000,                                 'Abidjan', 'test1','tes2', 'test2',  'test3');            }            function calltouchpayBF(){              sendPaymentInfos(new Date().getTime(),                               'MEEBF2961','hQIlBER4kNvIh264Kor1WczeOE0qW5Z1g0YjRqjhTBuG2uaiKl',                               'meeentreprisebf.com',  'https://www.google.fr/',                               'https://www.msn.com/fr-fr', 100,                               'Abidjan', 'test1','tes2', 'test2',  'test3');          }          function calltouchpayGN(){            sendPaymentInfos(new Date().getTime(),                             'MEEGN4700','NMAinYClLVmWEaMtVsrCPZxYj8yKiz4vTrTbTrdeeXq8GYmA6r',                             'meeentreprisegn.com',  'https://www.google.fr/',                             'https://www.msn.com/fr-fr', 100,                             'Abidjan', 'test1','tes2', 'test2',  'test3');        }        ",
          }}
          type="text/javascript"
        />
      </head>
      <body>
        <div className="items-center h-screen bg-black ">
          <div className="flex items-center justify-center gap-10 p-10 max-w-[500px] flex-wrap mx-auto ">
            <div
              className="h-20 border-2 cursor-pointer w-30 "
              onClick={() => {}}
            >
              <img
                alt=""
                className="object-cover w-full h-full "
                src="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg"
                srcSet=""
              />
            </div>
            <div className="h-20 border-2 cursor-pointer w-30 ">
              <img
                alt=""
                className="object-cover w-full h-full "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEX3fwD///8AnmBWUWjSAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII="
                srcSet=""
              />
            </div>
            <div className="h-20 border-2 cursor-pointer w-30 ">
              <img
                alt=""
                className="object-cover w-full h-full "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACFCAMAAAApQEceAAAAh1BMVEUAhT/jGyP970IAgj//9EJ5qkD+9kPrdy7iCiL/8kKexEEJij8AgD/47UIAfj8Aiz/e40JPo0CuyEHs6EJ0r0C7zUHk4kIbkj+20kFeq0Clx0EdjT/Y30Ly60Khv0Hn6EJssECPuUAjmj+DuEBjqEBYokCCskA1l0DP2kI/oUB6uEGLv0DD1kFSU4jTAAACVElEQVR4nO3ZXZOaMBQGYJakttEAAQT8QLcou7Bd///vW2CgFQg4HW9O2PeMFxoOMzyTk5BEy3o22A9uPxmrn79eno2nHYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAmABRahkQEQRiEZBwuw2XABFlkpTzXWIGxI6kjJbQI+GWsQe1ZQYkTiwriRcAiViVM19bRkCcfQ357ZgP2dRJnvEQsXPrJHc3NwGbAOE+a5L8uSQTIIK1WYb3SFtZD2qLIkRwcR+rfdcj+1XvAhfEIYds3Ytjl3bst2cH4pD0wjb38S+v18ySlDhEhBljD29xrzH10qpilzyQMG+wYiEK4SqfvyNX3AiILU7ZcbJT2DE7DWdiqpD69fE2IZG+5oVCF2IL9b7RUNjmPdVkE4ZU5RUUcpSaHEZlRR1SRTka83mpzyQOEZHXz/SiifUWcYh9HtSWPE8kEocofzDcmT9xdkobIkpvmOpNHNTRhjjr0awlz/qtO21I2FUWaz7NN19/UEcbknbXiyAoutGSalNpQ9rKYn718GnbO3JtHsT5aJ7d/dMMC+fTrX+yD+0gIQ2J61MH5t3ai/zW7FJc7SEwZQi/ymqJuFd/51sR5tUyUn6attbiF2YV6/slonAORbVs1CVThry61ttt2HjLLffVLEhVWZkaVZFQmbyatR/hl0i38xCn6KJpJgxxJv+iijUTMGHI/wUggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAsg3gHwBVOOG05v6eK8AAAAASUVORK5CYII="
                srcSet=""
              />
            </div>
            <div className="h-20 border-2 cursor-pointer w-30 ">
              <img
                alt=""
                className="object-cover w-full h-full "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAMAAAAFBRFXAAAAk1BMVEUAnknvKy380RZSjkXURTPzJizvIC791hTyXigAnUr/0hT81BX/1BAAmkzyZCgAm0vwQCvtAC/4px96rj30eyXwNCzxTSr7xxjzbif92xP3oCD8zBf+3xLxWin6vhr1hiP5sB32kiL1iyLUWDHdrSWNszjtzRxUp0LVxiUnnkmiujOWtTbiyiCvvDAzoka6vi7PNzS7UcqwAAACzklEQVR4nO3X23qaQBSGYUJbcDaASIyixpiNghuw9391nYq7RmI8mVl9lv97lnDAfM8sBvQe7oxHvQDXEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgh3pdoluTBQcPD4GNHcmCu73en2aO9MEB0+DwRPNFhMFD/N8eE/BD6M8H9HcmSa4P1ZqTPMQkwQH8cT3JzHJTJMEp6PQ98NRSnFvmmDTa4rvJjjoTP4G08w0RXDaa3a4R7HFJDvs793JDgdx2PSGFDNNEJz2VBOsKGaaYqQHh+ABwc3dBwfD8eEZHhN8T9sODi4cJ3o305fXLS/IdvBz3Pkknp6Cp5dXny0vyHbwyzgPPzn2muLP13L/xfKCbAennVl+Vnidymex7YPb+qEVdF9VeFtvqF671k8xB6e0OZZvKg7NoW3/1HbxWgr6sxuKw2nfxUvKzXs4fVPfPMhKvbn57PJ+OZHGU3mtV047qZuVeD8def9QXyZL9fH+29E6vB/OzBe6vVcv5u5W4bkjirK1WJeFcLgMh8Ry1VKsV0umvaY42lw8x3ITUS/Lppb3cUi9JouSddtIrxPqdVnTMtGsZ1rUrZ9bquZ6aEXr1k8Puea6xecTrU9PM9uZFsXiECz9qvKPfyyYfnhEq9OeZlGUnfZ7xXOLRdkUSlnWpjCqS7n/R8lyh0XRbKleVMkuUCRV83NCbljOdLRuTqsyS/Z5Isn2PydYntPLrYmTenv+1hX1Vptt11u6ZVmzm2ipM/HP9AqRmWKWM53MtXl8vYvZjTzzIOs5v+/pZaXVNmrZSBFtla6W7ldkl/nqMC/f9mvmlczv20NkZfHl2CZFmXEL9or6ymOa1LW7lTgirm7h9asAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAf+QN12HfyehjrygAAAABJRU5ErkJggg=="
                srcSet=""
              />
            </div>
            <div className="h-20 border-2 cursor-pointer w-30 ">
              <img
                alt=""
                className="object-cover w-full h-full "
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/langfr-225px-Flag_of_Cameroon.svg.png"
                srcSet=""
              />
            </div>
            <div className="h-20 border-2 cursor-pointer w-30 ">
              <img
                alt=""
                className="object-cover w-full h-full "
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEXOESb80RYAlGAUMqWHAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII="
                srcSet=""
              />
            </div>
          </div>
        </div>
        <form action="" method="post" target="TouchPay" />
      </body>
    </html>
    /*   <div dangerouslySetInnerHTML={{__html:html,}}>

    </div> */
    /*  <div className="items-center h-full bg-black "  >
        
    <div className="flex items-center justify-center gap-10 p-10 max-w-[400px] flex-wrap mx-auto ">
      <div  className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="https://upload.wikimedia.org/wikipedia/commons/9/92/Flag_of_Mali.svg" alt="" />
      </div>
      <div   className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEX3fwD///8AnmBWUWjSAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII=" alt="" />
      </div>
      <div  className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAACFCAMAAAApQEceAAAAh1BMVEUAhT/jGyP970IAgj//9EJ5qkD+9kPrdy7iCiL/8kKexEEJij8AgD/47UIAfj8Aiz/e40JPo0CuyEHs6EJ0r0C7zUHk4kIbkj+20kFeq0Clx0EdjT/Y30Ly60Khv0Hn6EJssECPuUAjmj+DuEBjqEBYokCCskA1l0DP2kI/oUB6uEGLv0DD1kFSU4jTAAACVElEQVR4nO3ZXZOaMBQGYJakttEAAQT8QLcou7Bd///vW2CgFQg4HW9O2PeMFxoOMzyTk5BEy3o22A9uPxmrn79eno2nHYAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAmABRahkQEQRiEZBwuw2XABFlkpTzXWIGxI6kjJbQI+GWsQe1ZQYkTiwriRcAiViVM19bRkCcfQ357ZgP2dRJnvEQsXPrJHc3NwGbAOE+a5L8uSQTIIK1WYb3SFtZD2qLIkRwcR+rfdcj+1XvAhfEIYds3Ytjl3bst2cH4pD0wjb38S+v18ySlDhEhBljD29xrzH10qpilzyQMG+wYiEK4SqfvyNX3AiILU7ZcbJT2DE7DWdiqpD69fE2IZG+5oVCF2IL9b7RUNjmPdVkE4ZU5RUUcpSaHEZlRR1SRTka83mpzyQOEZHXz/SiifUWcYh9HtSWPE8kEocofzDcmT9xdkobIkpvmOpNHNTRhjjr0awlz/qtO21I2FUWaz7NN19/UEcbknbXiyAoutGSalNpQ9rKYn718GnbO3JtHsT5aJ7d/dMMC+fTrX+yD+0gIQ2J61MH5t3ai/zW7FJc7SEwZQi/ymqJuFd/51sR5tUyUn6attbiF2YV6/slonAORbVs1CVThry61ttt2HjLLffVLEhVWZkaVZFQmbyatR/hl0i38xCn6KJpJgxxJv+iijUTMGHI/wUggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAggggAACCCCAAAIIIIAAAsg3gHwBVOOG05v6eK8AAAAASUVORK5CYII=" alt="" />
      </div>
    

      <div  className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAACgCAMAAAAFBRFXAAAAk1BMVEUAnknvKy380RZSjkXURTPzJizvIC791hTyXigAnUr/0hT81BX/1BAAmkzyZCgAm0vwQCvtAC/4px96rj30eyXwNCzxTSr7xxjzbif92xP3oCD8zBf+3xLxWin6vhr1hiP5sB32kiL1iyLUWDHdrSWNszjtzRxUp0LVxiUnnkmiujOWtTbiyiCvvDAzoka6vi7PNzS7UcqwAAACzklEQVR4nO3X23qaQBSGYUJbcDaASIyixpiNghuw9391nYq7RmI8mVl9lv97lnDAfM8sBvQe7oxHvQDXEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgrlDMHcI5g7B3CGYOwRzh2DuEMwdgh3pdoluTBQcPD4GNHcmCu73en2aO9MEB0+DwRPNFhMFD/N8eE/BD6M8H9HcmSa4P1ZqTPMQkwQH8cT3JzHJTJMEp6PQ98NRSnFvmmDTa4rvJjjoTP4G08w0RXDaa3a4R7HFJDvs793JDgdx2PSGFDNNEJz2VBOsKGaaYqQHh+ABwc3dBwfD8eEZHhN8T9sODi4cJ3o305fXLS/IdvBz3Pkknp6Cp5dXny0vyHbwyzgPPzn2muLP13L/xfKCbAennVl+Vnidymex7YPb+qEVdF9VeFtvqF671k8xB6e0OZZvKg7NoW3/1HbxWgr6sxuKw2nfxUvKzXs4fVPfPMhKvbn57PJ+OZHGU3mtV047qZuVeD8def9QXyZL9fH+29E6vB/OzBe6vVcv5u5W4bkjirK1WJeFcLgMh8Ry1VKsV0umvaY42lw8x3ITUS/Lppb3cUi9JouSddtIrxPqdVnTMtGsZ1rUrZ9bquZ6aEXr1k8Puea6xecTrU9PM9uZFsXiECz9qvKPfyyYfnhEq9OeZlGUnfZ7xXOLRdkUSlnWpjCqS7n/R8lyh0XRbKleVMkuUCRV83NCbljOdLRuTqsyS/Z5Isn2PydYntPLrYmTenv+1hX1Vptt11u6ZVmzm2ipM/HP9AqRmWKWM53MtXl8vYvZjTzzIOs5v+/pZaXVNmrZSBFtla6W7ldkl/nqMC/f9mvmlczv20NkZfHl2CZFmXEL9or6ymOa1LW7lTgirm7h9asAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAf+QN12HfyehjrygAAAABJRU5ErkJggg==" alt="" />
      </div>
      <div  className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Flag_of_Cameroon.svg/langfr-225px-Flag_of_Cameroon.svg.png" alt="" />
      </div>
      
      <div   className="h-20 border-2 cursor-pointer w-30 ">
        <img className="object-cover w-full h-full " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAACWCAMAAAAfSh8xAAAACVBMVEXOESb80RYAlGAUMqWHAAAAoUlEQVR4nO3PMQEAAAgDoGn/0IZwJzQg6Zme7SkGDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDR8OvdOD1wQ8tBkAAAAASUVORK5CYII=" alt="" />
      </div>
    </div>

    
    </div> */
  );
}

export default IntouchApi;
