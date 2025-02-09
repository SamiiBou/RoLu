//
//  CustomView6.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView6: View {
    @State public var image2Path: String = "image2_1213681"
    @State public var text4Text: String = "Theater Event"
    @State public var text5Text: String = "45 MXN"
    @State public var image3Path: String = "image3_1213687"
    @State public var text6Text: String = "Security"
    @State public var image4Path: String = "image4_1213689"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image2Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.789, alignment: .topLeading)
            Text(text4Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 113.068)
            Text(text5Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 134.068)
            CustomView7(
                image3Path: image3Path,
                text6Text: text6Text)
                .frame(width: 65.108, height: 29.368)
                .offset(y: 153.7)
            Image(image4Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 149, height: 108, alignment: .topLeading)
                .offset(x: -4, y: 0.068)
        }
        .frame(width: 131.108, height: 183.068, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView6_Previews: PreviewProvider {
    static var previews: some View {
        CustomView6()
    }
}
