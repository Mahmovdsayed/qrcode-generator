'use client'
import { Button, Divider, Form, Input } from "@nextui-org/react";
import { QRCodeCanvas } from "qrcode.react";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { BsQrCode } from "react-icons/bs";
import { useTheme } from "next-themes";
import { FaDownload } from "react-icons/fa";

const page = () => {
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [submitted, setSubmitted] = useState<null | { [k: string]: FormDataEntryValue }>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [qrColor, setQrColor] = useState<string>("");

  const getURLError = (value: string) => {
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(:\d{1,5})?(\/.*)?$/i;
    if (!value) {
      return "URL cannot be empty";
    }
    if (!urlPattern.test(value)) {
      return "Please enter a valid URL (e.g., https://google.com)";
    }
    return null;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors: Record<string, string> = {};
    const urlError = getURLError(data.url as string);
    if (urlError) {
      newErrors.url = urlError;
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setQrCodeUrl(data.url as string);
    setErrors({});
    setSubmitted(data);
  };

  const { theme, setTheme } = useTheme();

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const canvas = document.getElementById('qr-code-canvas') as HTMLCanvasElement;
      const dataUrl = canvas?.toDataURL();
      const link = document.createElement('a');
      link.href = dataUrl!;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <>
      <main className="min-h-[90dvh] flex flex-col items-center justify-center px-4 py-6">
        <div className="container mx-auto">
          <div className="text-center mb-4">
            <h1 className="text-4xl font-semibold text-center mb-4">QR Code Generator</h1>
            <p className="text-xs md:text-sm font-medium text-default-600 lg:w-1/2 md:mx-auto">
              Use this tool to easily generate a QR code for any URL. Simply enter the URL in the input field below,
              and a unique QR code will be created instantly. Perfect for sharing links, websites, or digital content in a quick and accessible way!
            </p>
          </div>
          <div className="text-center lg:w-1/2 mx-auto mt-4">
            <Form onSubmit={onSubmit} validationBehavior="native" validationErrors={errors} onReset={() => setSubmitted(null)} className="flex flex-col items-center justify-center">
              <Input
                type="text"
                placeholder="Enter Website URL"
                variant="underlined"
                startContent={<IoIosLink />}
                isClearable
                isRequired
                errorMessage={({ validationDetails }) => {
                  if (validationDetails.valueMissing) {
                    return "Please enter a URL";
                  }
                  if (errors.url) {
                    return errors.url;
                  }
                  return null;
                }}
                label="Website URL"
                onChange={(e) => setUrl(e.target.value)}
                name="url"
              />
              <Button
                startContent={<BsQrCode />}
                className="bg-default-200 w-full text-black mt-3 dark:bg-default-100 dark:text-white font-medium"
                variant="flat"
                // size="sm"
                type="submit"
                radius="full"
              >
                Create QR Code
              </Button>
            </Form>
          </div>

          {qrCodeUrl && (
            <div className="mt-6 flex flex-col items-center justify-center">
              <Input
                type="color"
                value={qrColor || (theme === 'dark' ? '#fff' : '#000')}
                onChange={(e) => setQrColor(e.target.value)}
                variant="flat"
                className="my-3 max-w-[200px] font-medium"
                size="sm"
                labelPlacement="outside"
                radius="sm"
                label="QR Code Color"
              />
              <QRCodeCanvas
                id="qr-code-canvas"
                value={qrCodeUrl}
                size={256}
                level="H"
                bgColor="transparent"
                fgColor={qrColor || (theme === 'dark' ? '#fff' : '#000')}
              />

              <Button
                onPress={downloadQRCode}
                radius="full"
                className="bg-default-200 text-black mt-6 dark:bg-default-100 dark:text-white font-medium"
                variant="flat"
                startContent={<FaDownload />}
              >
                Download QR Code
              </Button>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default page;
