import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share';

interface ShareButtonsProps {
  title: string;
  description?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, description }) => {
  const url = window.location.href;
  const shareText = `Check out my ${title}${description ? `: ${description}` : ''}`;

  return (
    <div className="flex justify-center gap-3 mt-6 pt-6 border-t border-white/10">
      <FacebookShareButton url={url} quote={shareText}>
        <FacebookIcon size={32} round className="hover:scale-110 transition-transform" />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={shareText}>
        <TwitterIcon size={32} round className="hover:scale-110 transition-transform" />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={shareText}>
        <WhatsappIcon size={32} round className="hover:scale-110 transition-transform" />
      </WhatsappShareButton>

      <TelegramShareButton url={url} title={shareText}>
        <TelegramIcon size={32} round className="hover:scale-110 transition-transform" />
      </TelegramShareButton>
    </div>
  );
};

export default ShareButtons;