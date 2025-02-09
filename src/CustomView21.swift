//
//  CustomView21.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView21: View {
    @State public var image19Path: String = "image19_I121375426518"
    @State public var text31Text: String = "Chats"
    @State public var text32Text: String = "Notifications"
    @State public var text33Text: String = "Watch"
    @State public var text34Text: String = "Profile"
    @State public var image20Path: String = "image20_I12137542884"
    @State public var image21Path: String = "image21_I121375428132"
    @State public var image22Path: String = "image22_I121375428195"
    @State public var image23Path: String = "image23_I121375428239"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Group {
                Rectangle()
                    .fill(Color(red: 0.96, green: 0.96, blue: 0.98, opacity: 1.00))
                    .clipShape(RoundedRectangle(cornerRadius: 100))
                    .frame(width: 155, height: 3)
                    .offset(x: 147, y: 80)
                Image(image19Path)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 448, height: 72, alignment: .topLeading)
                    .offset(y: 21)
                Rectangle()
                    .fill(Color.clear)
                    .frame(width: 447, height: 91)
                    .offset(x: 1)
                Rectangle()
                    .fill(Color.clear)
                    .frame(width: 447, height: 91)
                    .offset(x: 1)
                Text(text31Text)
                    .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                    .font(.custom("SFUIText-Regular", size: 10))
                    .lineLimit(1)
                    .frame(alignment: .leading)
                    .multilineTextAlignment(.leading)
                    .offset(x: 43, y: 68)
                Text(text32Text)
                    .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                    .font(.custom("SFUIText-Regular", size: 10))
                    .lineLimit(1)
                    .frame(alignment: .leading)
                    .multilineTextAlignment(.leading)
                    .offset(x: 114, y: 68)
                Text(text33Text)
                    .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                    .font(.custom("SFUIText-Regular", size: 10))
                    .lineLimit(1)
                    .frame(alignment: .leading)
                    .multilineTextAlignment(.leading)
                    .offset(x: 285, y: 68)
                Text(text34Text)
                    .foregroundColor(Color(red: 0.00, green: 0.00, blue: 0.00, opacity: 1.00))
                    .font(.custom("SFUIText-Regular", size: 10))
                    .lineLimit(1)
                    .frame(alignment: .leading)
                    .multilineTextAlignment(.leading)
                    .offset(x: 359, y: 68)
                Image(image20Path)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 24, height: 24, alignment: .topLeading)
                    .offset(x: 48, y: 45)
                Image(image21Path)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 24, height: 24, alignment: .topLeading)
                    .offset(x: 136, y: 45)
            }
            Group {
                Image(image22Path)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 24, height: 24, alignment: .topLeading)
                    .offset(x: 289, y: 45)
                Image(image23Path)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 24, height: 24, alignment: .topLeading)
                    .offset(x: 363, y: 45)
            }
        }
        .frame(width: 448, height: 93, alignment: .topLeading)
    }
}

struct CustomView21_Previews: PreviewProvider {
    static var previews: some View {
        CustomView21()
    }
}
