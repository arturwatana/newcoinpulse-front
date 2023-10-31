"use client"
import {Flex, chakra, Icon,  } from "@chakra-ui/react"
import BackPageBtn from '../components/BackPageBtn'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
        <chakra.main w="100vw" minH="100vh" h={{base:"100%", lg:"100vh"}}overflow={"hidden"} flexDir={{base:"column",lg:"row"}} position={"relative"} display={"flex"}>
            <BackPageBtn/>
            <Flex  w={{base:"100%", lg:"60%"}} h={{base:"100vh"}} flexDir={"column"} justifyContent={"center"}  alignItems={"center"} textColor={"white"} py="80px">
            <Icon display={{base:"none", lg:"block"}} viewBox="0 0 974.75537 674.09487" w="100%" h={{base:"30%",lg:"50%" }}top="40%" right="28%" position={"absolute"}  >
                    <polygon points="235.06938 78.21322 268.85303 63.99549 283.34349 93.70094 247.84185 108.19141 235.06938 78.21322" fill="#ffb6b6"/><polygon points="235.06938 78.21322 268.85303 63.99549 283.34349 93.70094 247.84185 108.19141 235.06938 78.21322" opacity=".1"/><path d="M239.8721,66.89358l33.32807,38.39973s-23.18474,73.17685-46.36949,79.69756-65.93162,38.39973-65.93162,38.39973l-53.61472-34.77712,26.08284-38.39973s63.03352-86.21827,79.69756-86.21827c16.66403,0,26.80736,2.89809,26.80736,2.89809Z" fill="#e6e6e6"/><path d="M194.84296,317.21637H117.26104l-4.90504-6.55697-20.02583-26.7711-4.60796-6.15845s-17.38856-31.87902-13.76594-60.85995c3.62262-28.98093,41.29783-35.50164,41.29783-35.50164h1.55049l46.12313,40.52979-2.75318,37.71872,14.60637,24.27153,20.06205,33.32807Z" fill="#2f2e41"/><polygon points="133.14983 317.21637 112.35601 317.21637 112.35601 286.42413 133.14983 317.21637" fill="#2f2e41"/><polygon points="704.74455 101.83981 712.5 150.21637 663.5 150.84831 663.5 108.78901 704.74455 101.83981" fill="#a0616a"/><path d="M821.46138,270.47011l-2.58651,13.41818-6.41927,33.32807h-128.95789c1.00701-7.46988,2.38371-18.22178,3.85442-29.82865,.14496-1.15922,.29708-2.32569,.44195-3.49942,3.68789-29.17657,7.72344-62.19314,7.72344-62.19314l16.95386,2.05771,32.89328,3.98488,13.40368,1.62293,35.89291,4.35439c17.89569,2.16632,30.20533,19.04774,26.80011,36.75505Z" fill="#f2f2f2"/><path d="M764.14436,317.21637h-69.94541c1.06503-1.25341,1.66635-1.97793,1.66635-1.97793l20.96775-3.46324,43.20324-7.12937s1.97068,5.09342,4.10808,12.57055Z" fill="#2f2e41"/><path d="M667.92047,317.21637h-105.62827c1.05052-2.08663,2.13731-4.18051,3.2531-6.26714,1.49256-2.7894,3.08648-5.27446,4.77467-7.48429,1.12296-1.4708,2.28218-2.81841,3.47766-4.05015,3.51392-3.61536,7.33942-6.2453,11.36782-8.04935,14.38168-6.47003,31.32838-2.50691,45.76082,3.94136,5.41942,2.41988,10.48383,5.18752,14.92525,7.88282,7.8248,4.75283,13.72968,9.28835,16.24375,11.30255,.86939,.68826,1.3331,1.08678,1.3331,1.08678l4.4921,1.63743Z" fill="#2f2e41"/><polygon points="584.12209 317.21637 569.13891 317.21637 573.08752 312.63008 575.31911 310.03632 576.27553 310.81152 584.12209 317.21637" fill="#ffb6b6"/><path d="M769.25944,317.21637h-129.02298l5.61506-14.02676,7.7161-19.30131,3.87627-9.69412-3.20251-13.62824s-1.57941-1.11579-3.98488-3.12274c-8.57099-7.10036-27.64774-25.38732-23.26434-44.16691,4.98464-21.37344,11.24462-63.02627,12.57037-72.00321,.16671-1.12296,.25365-1.73153,.25365-1.73153l18.62021-4.56453,.61592-.15212,1.99969-.49271h49.87607l36.6827,24.84393-.00725,.26082-2.23884,68.30082-.95633,29.21999s-1.15197,4.21669-.87673,10.7664c.18113,4.4921,1.02894,10.07814,3.37639,16.16416,2.48507,6.46994,6.66558,13.49787,13.52679,20.35909,5.18036,5.18036,7.69443,9.542,8.82464,12.96898Z" fill="#e6e6e6"/><path d="M758.76836,229.36067c-1.2244,10.04188-2.39813,17.17842-2.39813,17.17842l-12.83862,21.18505-9.79548,16.16416-16.9031,27.88689-2.4779,4.09357-1.76788,1.3476h-53.02781l2.53583-2.72421,25.25687-27.10444,3.26761-3.49942,5.29622-5.68758,16.55543-54.44785,19.51136-64.17107s7.90457-2.75314,15.62076-.14487c4.05731,1.36936,8.07111,4.22403,10.83159,9.75931,5.2818,10.56361,2.70971,40.77619,.33325,60.16444Z" fill="#e6e6e6"/><path d="M665.48599,227.60738l-15.22949,29.83582-13.49778,26.4451-5.83245,11.41849-2.29668,4.50651-19.68533,17.40306h-44.57268l7.34668-9.12906,2.73147-3.40522,10.71573-13.31665,6.01349-7.47713,16.32344-20.30116,4.35386-92.46236c.72213-15.33578,12.40681-27.73295,27.61481-29.83638,.0325-.0045,.06301-.0096,.09149-.01532,4.9413-.9925,12.79519-1.28233,18.87387,4.59354,.21014,.19564,.41303,.40578,.61592,.62308,1.02151,1.07953,1.98519,2.34745,2.86908,3.83267,.08694,.14496,.17388,.29717,.25357,.44929,.25357,.46362,.49997,.97084,.72452,1.51423,7.7597,18.06966,2.58651,75.3215,2.58651,75.3215Z" fill="#e6e6e6"/><circle cx="678.77617" cy="88.14428" r="35.2268" fill="#a0616a"/><path d="M693.38291,101.99387s-3.65152-10.06114-5.7222-15.28194c-2.07068-5.2208-.72048-11.99577-.72048-11.99577,0,0-27.6332-6.09946-38.45428-.05391-10.82108,6.04555-11.54897-24.36244-.56621-32.63841,0,0,2.94097,5.11141,1.79962,6.58093l-1.14136,1.46952s8.31092-17.57621,22.34501-18.45614c0,0,6.65176,5.30755,4.14485,7.05945-2.50691,1.75191,18.48278-9.90356,22.1343,.15758,0,0,13.38353,2.3844,10.77554,6.9556l.21974,3.15493s12.1299-1.25942,11.26538,7.33606c0,0-4.0804-.81319-6.69032,.92932s6.20819,10.005,6.20819,10.005c0,0,5.30005,34.43032-13.07972,44.34327,0,0,2.98122-15.66865-4.03438-13.10717-7.0156,2.56148-8.48368,3.54165-8.48368,3.54165Z" fill="#2f2e41"/><path d="M845.64111,325.71637H21.16406c-11.66992,0-21.16406-9.49414-21.16406-21.16406s9.49414-21.16406,21.16406-21.16406H845.64111c11.66992,0,21.16406,9.49414,21.16406,21.16406s-9.49414,21.16406-21.16406,21.16406Z" fill="#e6e6e6"/><path d="M817.52211,218.87821l-1.60291,74.80242c-.15517,7.24107-6.06962,13.03015-13.31236,13.03015h-137.60256c-7.07149,0-12.90955-5.52763-13.29556-12.58857l-4.08931-74.80242c-.41702-7.62814,5.65604-14.04226,13.29556-14.04226h143.29478c7.46556,0,13.4723,6.13683,13.31236,13.60068Z" fill="#3f3d56"/><circle cx="296.38476" cy="63.34798" r="32.92181" fill="#ffb6b6"/><polygon points="241.32114 149.48923 244.94376 188.61349 269.57755 287.87318 248.29566 295.33234 212.34021 187.16444 207.37409 143.69305 241.32114 149.48923" fill="#ffb6b6"/><path d="M231.52211,218.87821l-1.60291,74.80242c-.15517,7.24107-6.06962,13.03015-13.31236,13.03015H79.00427c-7.07149,0-12.90955-5.52763-13.29556-12.58857l-4.08931-74.80242c-.41702-7.62814,5.65604-14.04226,13.29556-14.04226H218.20974c7.46556,0,13.4723,6.13683,13.31236,13.60068Z" fill="#3f3d56"/><ellipse cx="273.5" cy="295.71637" rx="26" ry="11.5" fill="#ffb6b6"/><path d="M190.24225,155.47083l14.85273-79.15844s41.29783-5.79619,42.74687,7.96976-1.03544,81.04198-1.03544,81.04198l-56.56416-9.85329Z" fill="#e6e6e6"/><path d="M283.09519,68.52443s20.36536-7.26838,28.95593-11.17911c8.59056-3.91073,25.65708,23.36637,26.03673,8.96042,.37965-14.40595-5.51755-20.44717-5.51755-20.44717,0,0-1.4726-31.51507-33.2233-27.57494,0,0,6.98375-15.76734-15.94076-18.20547-22.92451-2.43813-58.58934,52.92097-55.39531,61.19409,3.19403,8.27312,7.02295,15.11285-2.03888,23.95865-9.06183,8.8458-26.03033,58.76917-13.11998,72.20319,12.91035,13.43402,13.7575,19.26357,4.91188,27.62122-8.84562,8.35765-29.75425,26.53032-7.14719,29.68515,22.60706,3.15483-2.06828,.79851,14.7856-14.0263,16.85389-14.82481,41.44742-14.21933,32.26457-38.00455-9.18284-23.78522,6.77112-57.86925,4.77485-63.03995-1.99627-5.1707,4.4726-38.00496,4.4726-38.00496,0,0,15.05504-2.21189,16.1808,6.85974Z" fill="#2f2e41"/><g><path d="M553.90176,221.98203c-16.25607,58.47673-82.29613,94.06481-147.50707,79.48233-65.18425-14.57905-104.86613-73.80966-88.6024-132.28296,16.24853-58.48349,82.28859-94.07512,147.48038-79.49596,65.20711,14.57905,104.88505,73.81653,88.62898,132.29659h.00012Z" fill="#f7931a"/><path d="M489.50855,180.02538c2.4228-14.5245-9.90814-22.33255-26.76895-27.54134l5.46938-19.67532-13.35401-2.98472-5.32487,19.1568c-3.51064-.78459-7.11634-1.52474-10.69918-2.25811l5.36294-19.28307-13.34646-2.98472-5.47321,19.66845c-2.9059-.59357-5.75852-1.18027-8.52745-1.79768l.01521-.06142-18.41655-4.12409-3.55243,12.79167s9.90814,2.03638,9.69886,2.16265c5.40855,1.21098,6.38601,4.42077,6.22246,6.96547l-6.23012,22.41447c.37271,.08526,.85581,.20809,1.38824,.39912-.44503-.09889-.92046-.20809-1.4111-.31386l-8.73278,31.39925c-.66185,1.47362-2.33911,3.68396-6.11985,2.84492,.13314,.17395-9.70652-2.17286-9.70652-2.17286l-6.62953,13.70931,17.37816,3.88528c3.23299,.72661,6.40133,1.48726,9.52011,2.20357l-5.52648,19.90048,13.3388,2.98472,5.47321-19.68895c3.64377,.88692,7.18099,1.70556,10.64219,2.47651l-5.45417,19.59683,13.35401,2.98472,5.52648-19.8629c22.7715,3.86478,39.89488,2.30589,47.10245-16.16531,5.80796-14.8724-.28902-23.4514-12.27012-29.04568,8.72523-1.80445,15.29766-6.95183,17.05106-17.58428l.00023,.0001Zm-30.51162,38.37159c-4.12676,14.8724-32.0482,6.83243-41.10053,4.81645l7.33317-26.36451c9.05233,2.02618,38.08054,6.03763,33.76737,21.54795v.0001Zm4.13059-38.58655c-3.76542,13.52849-27.00482,6.65504-34.54332,4.96999l6.64845-23.91194c7.5385,1.68505,31.81617,4.83009,27.89487,18.94194Z" fill="#fff"/></g>
                </Icon>
            </Flex>
            <Icon position={{base:"absolute",lg:"absolute"}}  viewBox="0 0 1440 320" w={{base:"250%",lg:"100%"}} h="100%"bottom={{base:"5%", lg: "0"}} right={{base:"0",lg:"-1%"}} transform={{base:"rotate(0deg)", lg:"rotate(-90deg)"}} >
            <path fill="#F2A900" fillOpacity="1" d="M0,96L48,101.3C96,107,192,117,288,128C384,139,480,149,576,133.3C672,117,768,75,864,69.3C960,64,1056,96,1152,128C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </Icon>
        {children}
        <Flex textColor={"white"} w={{base: "100%", lg:"50%"}} h={{base:"100vh",lg:"100%"}} bg="#F2A900" flexDir={"column"} justifyContent={"center"} alignItems={"center"} gap="50px" >
                <Icon viewBox="0 0 974.75537 674.09487" w="100%" h="30%" >
                    <path d="M200.71917,407.36064c-18.046,14.76488,11.48379,144.36789,11.48379,144.36789s6.56217,197.68563,20.50679,206.70858,45.115-.82032,57.419-2.46083,1.64052-123.86109-16.40545-168.976S269.622,476.26352,269.622,476.26352l97.61237,18.86628s-59.05961,50.0366-56.59878,60.70013,65.62174,46.75545,77.10558,48.396,33.6311-65.62174,53.31769-111.557-134.52456-75.46506-134.52456-75.46506l-21.32711-40.19333S218.76519,392.59577,200.71917,407.36064Z" transform="translate(-112.62232 -112.95256)" fill="#2f2e41"/><path d="M249.71,761.841s-5.95236,20.83329,0,20.83329,16.865,5.95236,33.73,3.96824,11.90467-22.81735,0-25.79356-8.92851-26.78565-8.92851-26.78565c-3.9683-7.93648-22.81741,1.98412-22.81741,1.98412Z" transform="translate(-112.62232 -112.95256)" fill="#2f2e41"/><path d="M334.21617,596.17371s-10.21191,19.10945-4.39346,20.36467,15.23047,9.37512,32.13464,10.99219,16.44885-19.79375,5.43949-25.21351-3.079-28.06614-3.079-28.06614c-2.20534-8.59483-22.72269-2.87236-22.72269-2.87236Z" transform="translate(-112.62232 -112.95256)" fill="#2f2e41"/><path d="M211.7928,229.77171c1.64051,3.28109-5.74192,44.29468-5.74192,44.29468l6.56218,11.48381s37.73255-14.76481,31.99063-17.22565-4.92166-32.81089-4.92166-32.81089S210.15228,226.49062,211.7928,229.77171Z" transform="translate(-112.62232 -112.95256)" fill="#ffb9b9"/><circle cx="113.37253" cy="79.16753" r="50.29399" fill="#2f2e41"/><circle cx="109.90398" cy="32.08409" r="20.81129" fill="#2f2e41"/><path d="M231.63121,154.4627a21.0442,21.0442,0,0,0,2.16787.11252,20.81133,20.81133,0,1,0,0-41.62266,21.0442,21.0442,0,0,0-2.16787.11252,20.81211,20.81211,0,0,1,0,41.39762Z" transform="translate(-112.62232 -112.95256)" fill="#2f2e41"/><circle cx="114.75567" cy="103.69483" r="34.45142" fill="#ffb9b9"/><path d="M177.75143,269.55494c-10.66358,2.4608-28.70955,28.70952-28.70955,28.70952L177.75143,326.974s20.5068,77.10557,22.96763,80.38666c16.12166,21.49552,88.58941-26.24868,88.58941-26.24868s-2.871-23.37776-1.23041-34.86157c1.57784-11.04477-6.152-33.221-6.152-33.221s27.069-11.48381,21.32711-22.96762-41.01365-37.7325-55.77852-28.70952-44.29468,0-44.29468,0S188.415,267.09414,177.75143,269.55494Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M387.33106,434.8398s46.75545,40.19337,58.2393,31.99061-44.29468-36.91227-44.29468-36.91227Z" transform="translate(-112.62232 -112.95256)" fill="#ffb9b9"/><path d="M177.34139,420.89516c6.56218,7.38247,37.73255-11.48381,33.73637-19.86222s-28.81477,8.37841-28.81477,8.37841S170.77921,413.51269,177.34139,420.89516Z" transform="translate(-112.62232 -112.95256)" fill="#ffb9b9"/><path d="M177.75149,309.74827l-34.45141,63.98122s39.373,32.81092,44.29462,33.63115-9.84327,22.14734-9.84327,22.14734-44.29468-31.17035-61.52039-46.75551,32.8109-84.488,32.8109-84.488l14.76493-9.023Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M277.82469,307.2875,318.018,369.62817s61.52044,68.90288,69.72314,72.18394,18.046-12.3041,18.046-12.3041l-73.82448-89.40967-27.88923-50.0366-10.66353-4.10135Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><ellipse cx="113.37253" cy="62.76198" rx="34.68552" ry="20.81131" fill="#2f2e41"/><path d="M323.29931,624.742a4.29286,4.29286,0,0,0-4.28784,4.28783V775.27447a4.2928,4.2928,0,0,0,4.28784,4.28777h498.6688a4.29285,4.29285,0,0,0,4.28778-4.28777V629.02977a4.29283,4.29283,0,0,0-4.28778-4.28784Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M329.75661,768.81711H815.51047V635.48718H329.75661Z" transform="translate(-112.62232 -112.95256)" fill="#fff"/><path d="M754.19649,741.15725a7.10265,7.10265,0,1,0,0,14.20529H782.607a7.10264,7.10264,0,1,0,0-14.20529H754.19649Z" transform="translate(-112.62232 -112.95256)" fill="#F2A900"/><rect x="349.1219" y="614.42769" width="327.96547" height="1.86875" fill="#e6e6e6"/><circle cx="280.56677" cy="589.19958" r="41.36917" fill="#F2A900"/><polygon points="349.64 603.993 348.604 602.438 382.684 579.717 406.054 590.935 439.669 569.459 506.537 597.983 559.787 571.825 611.495 592.788 676.468 535.241 677.707 536.64 611.867 594.956 559.86 573.871 506.591 600.038 439.843 571.565 406.184 593.071 382.835 581.864 349.64 603.993" fill="#3f3d56"/><path d="M467.81765,742.1343a6.07344,6.07344,0,1,0,0,12.14687h63.53747a6.07344,6.07344,0,0,0,0-12.14687Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M408.98917,683.6448h6.46415l-13.45045,13.311a12.5581,12.5581,0,0,1-17.63115,0l-13.44867-13.311h6.46416l10.21748,10.112a7.95365,7.95365,0,0,0,11.167,0ZM377.305,720.65949h-6.46416l13.53272-13.39324a12.55811,12.55811,0,0,1,17.63114,0l13.53272,13.39324h-6.46416l-10.30153-10.19424a7.95365,7.95365,0,0,0-11.167,0Z" transform="translate(-112.62232 -112.95256)" fill="#fff"/><path d="M388.23446,156.30683a4.29285,4.29285,0,0,0-4.28783,4.28784V306.83934a4.2928,4.2928,0,0,0,4.28783,4.28778H886.90327a4.29287,4.29287,0,0,0,4.28777-4.28778V160.59464a4.29282,4.29282,0,0,0-4.28777-4.28784Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M394.69176,300.382H880.44562V167.05205H394.69176Z" transform="translate(-112.62232 -112.95256)" fill="#fff"/><path d="M819.13164,272.72212a7.10265,7.10265,0,1,0,0,14.2053h28.41054a7.10265,7.10265,0,0,0,0-14.2053H819.13164Z" transform="translate(-112.62232 -112.95256)" fill="#F2A900"/><rect x="414.05705" y="145.99257" width="327.96547" height="1.86875" fill="#e6e6e6"/><circle cx="345.50192" cy="120.76445" r="41.36917" fill="#F2A900"/><polygon points="414.575 135.557 413.539 134.002 447.619 111.282 470.989 122.5 504.604 101.024 505.058 101.217 571.472 129.548 624.722 103.39 676.43 124.353 741.403 66.805 742.642 68.204 676.802 126.52 624.795 105.436 571.527 131.603 504.779 103.13 471.119 124.635 447.77 113.427 414.575 135.557" fill="#3f3d56"/><path d="M532.7528,273.69917a6.07344,6.07344,0,0,0,0,12.14687h63.53747a6.07343,6.07343,0,1,0,0-12.14687Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M474.76928,228.88845c.77325-5.17689-3.16839-7.95986-8.558-9.8164l1.74833-7.01275-4.26991-1.06383-1.70212,6.82795c-1.121-.27963-2.27356-.54346-3.41884-.80486l1.71428-6.87294-4.26626-1.06383-1.74954,7.01033c-.92887-.21155-1.84073-.42067-2.72583-.64073l.00486-.02188-5.88692-1.46991-1.13556,4.55926s3.16717.72584,3.1003.77082a2.27049,2.27049,0,0,1,1.98905,2.48268l-1.99148,7.989a3.53766,3.53766,0,0,1,.44376.14225l-.44985-.11185-2.7927,11.19147a1.55379,1.55379,0,0,1-1.95623,1.014c.04256.062-3.10273-.77447-3.10273-.77447l-2.11914,4.88753,5.55622,1.38481c1.03343.259,2.0462.53009,3.04194.7854l-1.76656,7.09422,4.26382,1.06383,1.75076-7.01762c1.16353.31611,2.29422.6079,3.40061.88267l-1.74346,6.9848,4.26869,1.06382,1.76656-7.07962c7.279,1.3775,12.75378.82188,15.0553-5.76048,1.85653-5.30091-.09119-8.35865-3.921-10.35379,2.789-.64559,4.89-2.48024,5.45045-6.2699Zm-9.7544,13.67658c-1.32036,5.30091-10.24436,2.43647-13.13919,1.71671l2.34407-9.39694c2.89361.72219,12.17141,2.152,10.79634,7.68023Zm1.31915-13.75317c-1.20365,4.82187-8.63221,2.372-11.04315,1.77142l2.12523-8.52278C459.82705,222.6611,467.58874,223.78208,466.334,228.81186Z" transform="translate(-112.62232 -112.95256)" fill="#fff"/><path d="M584.4211,390.5244a4.29284,4.29284,0,0,0-4.28783,4.28783V541.0569a4.2928,4.2928,0,0,0,4.28783,4.28778h498.66881a4.29285,4.29285,0,0,0,4.28777-4.28778V394.8122a4.29281,4.29281,0,0,0-4.28777-4.28783Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><path d="M590.8784,534.59954h485.75386V401.26962H590.8784Z" transform="translate(-112.62232 -112.95256)" fill="#fff"/><path d="M1015.31828,506.93968a7.10265,7.10265,0,1,0,0,14.2053h28.41054a7.10265,7.10265,0,1,0,0-14.2053h-28.41054Z" transform="translate(-112.62232 -112.95256)" fill="#F2A900"/><rect x="610.24369" y="380.21013" width="327.96547" height="1.86875" fill="#e6e6e6"/><circle cx="541.68856" cy="354.98202" r="41.36917" fill="#F2A900"/><polygon points="610.762 369.775 609.725 368.22 643.805 345.5 667.176 356.718 700.79 335.242 701.245 335.435 767.658 363.766 820.909 337.608 872.617 358.57 937.59 301.023 938.829 302.423 872.989 360.738 820.982 339.654 767.713 365.821 700.966 337.348 667.305 358.853 643.957 347.646 610.762 369.775" fill="#3f3d56"/><path d="M728.93944,507.91674a6.07343,6.07343,0,0,0,0,12.14687h63.53747a6.07343,6.07343,0,1,0,0-12.14687Z" transform="translate(-112.62232 -112.95256)" fill="#e6e6e6"/><polygon points="541.684 382.247 558.431 358.662 541.684 368.55 541.684 368.55 524.947 358.662 541.683 382.247 541.683 382.247 541.684 382.247 541.684 382.247 541.684 382.247" fill="#fff"/><polygon points="541.683 365.381 541.683 365.381 541.684 365.381 541.684 365.381 558.421 355.488 541.684 327.717 541.684 327.717 541.684 327.717 541.683 327.717 541.683 327.717 524.947 355.488 541.683 365.381" fill="#fff"/>
                </Icon>
           
            </Flex>
        </chakra.main>

  )
}
