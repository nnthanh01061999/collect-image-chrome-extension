import FacebookColorIcon from '@/components/icons/FacebookColorIcon';
import TelegramColorIcon from '@/components/icons/TelegramColorIcon';
import TwitterColorIcon from '@/components/icons/TwitterColorIcon';

export type TSocial = 'facebook' | 'twitter' | 'telegram';

type TSocialShareProps = {
    url: string;
    social: TSocial;
};

const socialSharedOptions = {
    facebook: {
        baseUrl: 'https://www.facebook.com/sharer/sharer.php?u={0}',
        icon: <FacebookColorIcon className='h-4 w-4' />,
    },

    twitter: {
        baseUrl: 'https://twitter.com/intent/tweet?url={0}',
        icon: <TwitterColorIcon className='h-4 w-4' />,
    },

    telegram: {
        baseUrl: 'https://telegram.me/share/url?url={0}',
        icon: <TelegramColorIcon className='h-4 w-4' />,
    },
} satisfies Record<
    TSocial,
    {
        baseUrl: string;
        icon: JSX.Element;
    }
>;

function SocialShare({ url, social, ...props }: TSocialShareProps) {
    const value = socialSharedOptions[social];
    return (
        <a
            href={stringFormat(value.baseUrl, url)}
            rel='noreferrer noopener'
            target='_blank'
        >
            {value.icon}
        </a>
    );
}

export default SocialShare;

const stringFormat = (input: string, ...replacer: string[]) => {
    for (let i = 0; i < replacer.length; i++) {
        input = input.replace(`{${i}}`, replacer[i] + '');
    }
    return input;
};
