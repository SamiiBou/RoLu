//
//  CustomView1.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView1: View {
    @State public var image1Path: String = "image1_I121367727558"
    @State public var text1Text: String = "Search Jobs"
    @State public var text2Text: String = "Work \nAnywhere"
    @State public var text3Text: String = "For You"
    @State public var image2Path: String = "image2_1213681"
    @State public var text4Text: String = "Theater Event"
    @State public var text5Text: String = "45 MXN"
    @State public var image3Path: String = "image3_1213687"
    @State public var text6Text: String = "Security"
    @State public var image4Path: String = "image4_1213689"
    @State public var image5Path: String = "image5_1213691"
    @State public var text7Text: String = "Mexico City"
    @State public var image6Path: String = "image6_1213694"
    @State public var image7Path: String = "image7_1213697"
    @State public var text8Text: String = "Babysitting"
    @State public var image8Path: String = "image8_1213701"
    @State public var text9Text: String = "200 MXN"
    @State public var image9Path: String = "image9_1213704"
    @State public var text10Text: String = "Childcare"
    @State public var image10Path: String = "image10_1213707"
    @State public var text11Text: String = "Dog Walk"
    @State public var text12Text: String = "60 MXN"
    @State public var text13Text: String = "Pets"
    @State public var image11Path: String = "image11_1213714"
    @State public var text14Text: String = "Jobs by Category"
    @State public var image12Path: String = "image12_1213718"
    @State public var text15Text: String = "Moving"
    @State public var text16Text: String = "32 Jobs"
    @State public var image13Path: String = "image13_1213724"
    @State public var image14Path: String = "image14_1213725"
    @State public var text17Text: String = "Moving"
    @State public var image15Path: String = "image15_1213728"
    @State public var text18Text: String = "Tutor"
    @State public var text19Text: String = "23 Jobs"
    @State public var image16Path: String = "image16_1213735"
    @State public var text20Text: String = "Tutor"
    @State public var image17Path: String = "image17_1213738"
    @State public var text21Text: String = "Pets"
    @State public var text22Text: String = "12 Jobs"
    @State public var text23Text: String = "Pets"
    @State public var image18Path: String = "image18_1213745"
    @State public var text24Text: String = "All"
    @State public var text25Text: String = "Moving"
    @State public var text26Text: String = "Childcare"
    @State public var text27Text: String = "Security"
    @State public var text28Text: String = "Plumber\n"
    @State public var text29Text: String = "Pets"
    @State public var text30Text: String = "Tutor"
    @State public var image19Path: String = "image19_I121375426518"
    @State public var text31Text: String = "Chats"
    @State public var text32Text: String = "Notifications"
    @State public var text33Text: String = "Watch"
    @State public var text34Text: String = "Profile"
    @State public var image20Path: String = "image20_I12137542884"
    @State public var image21Path: String = "image21_I121375428132"
    @State public var image22Path: String = "image22_I121375428195"
    @State public var image23Path: String = "image23_I121375428239"
    @State public var text35Text: String = "Work \nAnywhere"
    @State public var image24Path: String = "image24_I121375827558"
    @State public var text36Text: String = "Search Jobs"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Rectangle()
                .fill(Color(red: 1.00, green: 1.00, blue: 1.00, opacity: 1.00))
                .overlay(RoundedRectangle(cornerRadius: 0).stroke(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00), lineWidth: 1))
                .shadow(color: Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 0.25), radius: 4, x: 0, y: 4)
            Group {
                Rectangle()
                    .fill(Color(red: 0.85, green: 0.85, blue: 0.85, opacity: 1.00))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                    .frame(width: 448, height: 69)
                    .offset(x: 1, y: 45)
                CustomView3(
                    image1Path: image1Path,
                    text1Text: text1Text)
                    .frame(width: 310, height: 40)
                    .offset(x: 115, y: 60)
                    HStack {
                        Spacer()
                            Text(text2Text)
                                .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                                .font(.custom("Kranky-Regular", size: 16))
                                .frame(alignment: .center)
                                .multilineTextAlignment(.center)
                        Spacer()
                    }
                    .offset(y: 60)
                Text(text3Text)
                    .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                    .font(.system(size: 20))
                    .frame(alignment: .leading)
                    .multilineTextAlignment(.leading)
                    .offset(x: 30, y: 157)
                CustomView6(
                    image2Path: image2Path,
                    text4Text: text4Text,
                    text5Text: text5Text,
                    image3Path: image3Path,
                    text6Text: text6Text,
                    image4Path: image4Path)
                    .frame(width: 131.108, height: 183.068)
                    .offset(x: 30, y: 191.932)
                CustomView8(
                    image5Path: image5Path,
                    text7Text: text7Text,
                    image6Path: image6Path)
                    .frame(width: 153, height: 25)
                    .offset(x: 26, y: 125)
                CustomView9(
                    image7Path: image7Path,
                    text8Text: text8Text,
                    image8Path: image8Path,
                    text9Text: text9Text,
                    image9Path: image9Path,
                    text10Text: text10Text)
                    .frame(width: 131.108, height: 183.068)
                    .offset(x: 327.892, y: 191.932)
                CustomView11(
                    image10Path: image10Path,
                    text11Text: text11Text,
                    text12Text: text12Text,
                    text13Text: text13Text,
                    image11Path: image11Path)
                    .frame(width: 131.108, height: 183.068)
                    .offset(x: 178.946, y: 191.932)
                CustomView13(
                    text14Text: text14Text,
                    image12Path: image12Path,
                    text15Text: text15Text,
                    text16Text: text16Text,
                    image13Path: image13Path,
                    image14Path: image14Path,
                    text17Text: text17Text,
                    image15Path: image15Path,
                    text18Text: text18Text,
                    text19Text: text19Text,
                    image16Path: image16Path,
                    text20Text: text20Text,
                    image17Path: image17Path,
                    text21Text: text21Text,
                    text22Text: text22Text,
                    text23Text: text23Text,
                    image18Path: image18Path,
                    text24Text: text24Text,
                    text25Text: text25Text,
                    text26Text: text26Text,
                    text27Text: text27Text,
                    text28Text: text28Text,
                    text29Text: text29Text,
                    text30Text: text30Text)
                    .frame(width: 429, height: 252)
                    .offset(x: 30, y: 418)
                CustomView21(
                    image19Path: image19Path,
                    text31Text: text31Text,
                    text32Text: text32Text,
                    text33Text: text33Text,
                    text34Text: text34Text,
                    image20Path: image20Path,
                    image21Path: image21Path,
                    image22Path: image22Path,
                    image23Path: image23Path)
                    .frame(width: 448, height: 93)
                    .offset(x: 1, y: 687)
            }
            Group {
                Rectangle()
                    .fill(Color(red: 0.85, green: 0.85, blue: 0.85, opacity: 1.00))
                    .clipShape(RoundedRectangle(cornerRadius: 6))
                    .frame(width: 448, height: 69)
                    .offset(x: 1, y: 45)
                    HStack {
                        Spacer()
                            Text(text35Text)
                                .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                                .font(.custom("Kranky-Regular", size: 16))
                                .frame(alignment: .center)
                                .multilineTextAlignment(.center)
                        Spacer()
                    }
                    .offset(y: 60)
                CustomView26(
                    image24Path: image24Path,
                    text36Text: text36Text)
                    .frame(width: 310, height: 40)
                    .offset(x: 115, y: 60)
            }
        }
        .frame(width: 449, height: 778, alignment: .topLeading)
        .background(Color(red: 1.00, green: 1.00, blue: 1.00, opacity: 1.00))
        .overlay(RoundedRectangle(cornerRadius: 0).stroke(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00), lineWidth: 1))
    }
}

struct CustomView1_Previews: PreviewProvider {
    static var previews: some View {
        CustomView1()
    }
}
