//
//  CustomView14.swift
//
//  Created by codia-figma
//

import SwiftUI

struct CustomView14: View {
    @State public var image12Path: String = "image12_1213718"
    @State public var text15Text: String = "Moving"
    @State public var text16Text: String = "32 Jobs"
    @State public var image13Path: String = "image13_1213724"
    @State public var image14Path: String = "image14_1213725"
    @State public var text17Text: String = "Moving"
    var body: some View {
        ZStack(alignment: .topLeading) {
            Image(image12Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 131.108, height: 107.818, alignment: .topLeading)
            Text(text15Text)
                .foregroundColor(Color(red: 0.19, green: 0.19, blue: 0.19, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 14))
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 113.116)
            Text(text16Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Regular", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(y: 134.116)
            Rectangle()
                .fill(Color.clear)
                .clipped()
                .frame(width: 53.941, height: 29.376)
                .offset(x: -16, y: 149.116)
            Image(image13Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 230, height: 168, alignment: .topLeading)
                .cornerRadius(6)
                .offset(x: -47, y: -59.884)
            Image(image14Path)
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 56.189, height: 21.963, alignment: .topLeading)
                .cornerRadius(10.981)
                .offset(y: 154.116)
            Text(text17Text)
                .foregroundColor(Color(red: 0.41, green: 0.42, blue: 0.54, opacity: 1.00))
                .font(.custom("SFUIText-Medium", size: 12))
                .lineLimit(1)
                .frame(alignment: .leading)
                .multilineTextAlignment(.leading)
                .offset(x: 7, y: 157.116)
        }
        .frame(width: 131.108, height: 183.116, alignment: .topLeading)
        .clipped()
    }
}

struct CustomView14_Previews: PreviewProvider {
    static var previews: some View {
        CustomView14()
    }
}
