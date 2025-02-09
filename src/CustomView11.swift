//
//  CustomView11.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView11: View {
    @State public var image10Path: String = "image10_1213707"
    @State public var text11Text: String = "Dog Walk"
    @State public var text12Text: String = "60 MXN"
    @State public var text13Text: String = "Pets"
    @State public var image11Path: String = "image11_1213714"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image10Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.789, alignment: .topLeading)
            Text(text11Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 113)
            Text(text12Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 0.054, y: 134.068)
            Rectangle()
                .fill(Color(red: 0.94, green: 0.93, blue: 1.00, opacity: 1.00))
                .clipShape(RoundedRectangle(cornerRadius: 11))
                .frame(width: 41.919, height: 21.957)
                .offset(y: 153.7)
            Text(text13Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 7.054, y: 157.068)
            Image(image11Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 149, height: 108, alignment: .topLeading)
                .offset(x: 0.054, y: 0.068)
        }
        .frame(width: 131.108, height: 183.068, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView11_Previews: PreviewProvider {
    static var previews: some View {
        CustomView11()
    }
}
