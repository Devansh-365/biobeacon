import { useModal } from "@/hooks/use-modal";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ShareLinkModal = () => {
  const { type, isOpen, onClose, data } = useModal();

  const isModalOpen = isOpen && type === "shareLink";

  const { project } = data;

  const projectLink =
    process.env.NODE_ENV === "development"
      ? `http://localhost:3000/${project?.name}`
      : `https://biobeacon.vercel.app/${project?.name}`;

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(projectLink);
    setIsCopied(true);
    toast.success("Copied URL to clipboard!");
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const downloadQRCode = () => {
    let canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const pngUrl = canvas
      ?.toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = false ? `$ some.png` : "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden mx-auto">
        <DialogHeader className="pt-8 px-6 text-start">
          <DialogTitle className="text-xl font-bold">
            Share your Link
          </DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="url" className="pb-8 mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="url">
            <Card>
              <CardHeader>
                <CardTitle>URL</CardTitle>
                <CardDescription>
                  Add this link to your Twitter, Instagram or LinkedIn bio 🚀
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 w-full">
                <div className="relative mb-2">
                  <div className="flex justify-between items-center w-full h-6 px-4 py-[28px] mb-2 text-gray-700 border-2 rounded-2xl appearance-none focus:outline-none focus:shadow-outline">
                    <h2 className="truncate w-[250px] lg:w-full">
                      {projectLink}
                    </h2>
                    <button
                      onClick={handleCopyLink}
                      className="w-[80px] p-[12px] leading-none text-md text-white bg-slate-900 hover:bg-slate-700 rounded-3xl focus:outline-none focus:shadow-outline-blue"
                    >
                      {isCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>QR code</CardTitle>
                <CardDescription className="max-w-[374px]">
                  Share this QR code with your audience to provide access to
                  your profile.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <QRCodeCanvas
                  className="mx-auto w-full"
                  id="qr-code"
                  size={256}
                  includeMargin={true}
                  level="H"
                  value={projectLink}
                />
              </CardContent>
              <CardFooter>
                <Button onClick={downloadQRCode}>Download QR Code</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ShareLinkModal;
